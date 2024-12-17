import { startSession } from "mongoose"
import { IStudent } from "./students.interface"
import { Student } from "./students.model"
import AppError from "../../errors/AppError"
import { User } from "../user/user.model"
import QueryBuilder from "../../builder/QueryBuilder"
import { searchAbleFields } from "./student.constant"

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(
    Student.find()
      .populate("userId")
      .populate("admissionSemester")
      .populate({
        path: "academicDepartment",
        populate: { path: "academicFaculty" },
      }),
    query
  )
    .search(searchAbleFields)
    .filter()
    .sort()
    .pagination()
    .fields()

  const data = await studentQuery.queryModel
  return data
}

const getStudentFromDB = async (id: string) => {
  const data = await Student.findById(id)
    .populate("userId")
    .populate({
      path: "academicDepartment",
      populate: { path: "academicFaculty" },
    })
    .populate("admissionSemester")
  return data
}

const updateStudentFromDB = async (id: string, payload: Partial<IStudent>) => {
  const { name, guardian, ...remainingData } = payload

  const updatedData: Record<string, unknown> = { ...remainingData }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      updatedData[`name.${key}`] = value
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      updatedData[`guardian.${key}`] = value
    }
  }

  const data = await Student.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  })
  return data
}

const deleteStudentFromDB = async (id: string) => {
  const session = await startSession()

  try {
    session.startTransaction()

    const studentData = await Student.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session }
    )

    if (!studentData) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student")
    }

    const userId = studentData?.userId
    const userData = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session }
    )

    if (!userData) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user")
    }

    await session.commitTransaction()
    await session.endSession()

    return studentData
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
  }
}

export const StudentServices = {
  getAllStudentsFromDB,
  getStudentFromDB,
  updateStudentFromDB,
  deleteStudentFromDB,
}
