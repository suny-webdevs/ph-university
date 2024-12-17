import { startSession } from "mongoose"
import QueryBuilder from "../../builder/QueryBuilder"
import { IFaculty } from "./faculty.interface"
import { Faculty } from "./faculty.model"
import { User } from "../user/user.model"
import AppError from "../../errors/AppError"
import { searchAbleFields } from "./faculty.constant"

const getAllFaculties = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(
    Faculty.find()
      .populate("userId")
      .populate("academicDepartment")
      .populate("academicFaculty"),
    query
  )
    .search(searchAbleFields)
    .filter()
    .sort()
    .pagination()
    .fields()

  const data = await facultyQuery.queryModel
  return data
}

const getFaculty = async (id: string) => {
  const data = await Faculty.findById(id)
    .populate("userId")
    .populate("academicDepartment")
    .populate("academicFaculty")
  return data
}

const updateFaculty = async (id: string, payload: Partial<IFaculty>) => {
  const { name, ...remainingData } = payload
  const updatedData: Record<string, unknown> = { ...remainingData }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      updatedData[`name.${key}`] = value
    }
  }

  const data = await Faculty.findByIdAndUpdate(id, updatedData, {
    new: true,
  })
  return data
}

const deleteFaculty = async (id: string) => {
  const session = await startSession()
  try {
    session.startTransaction()

    const facultyData = await Faculty.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session }
    )

    if (!facultyData) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete faculty")
    }

    const userId = facultyData?.userId
    const userData = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session }
    )

    if (!userData) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete faculty")
    }

    await session.commitTransaction()
    await session.endSession()

    return facultyData
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    error
  }
}

export const FacultyServices = {
  getAllFaculties,
  getFaculty,
  updateFaculty,
  deleteFaculty,
}
