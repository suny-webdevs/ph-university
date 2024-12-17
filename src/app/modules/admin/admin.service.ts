import { startSession } from "mongoose"
import QueryBuilder from "../../builder/QueryBuilder"
import { searchAbleFields } from "./admin.constant"
import { IAdmin } from "./admin.interface"
import { Admin } from "./admin.model"
import { User } from "../user/user.model"
import AppError from "../../errors/AppError"

const getAllAdmins = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(
    Admin.find().populate("userId").populate("managementDepartment"),
    query
  )
    .search(searchAbleFields)
    .filter()
    .sort()
    .pagination()
    .fields()

  const data = await adminQuery.queryModel
  return data
}

const getAdmin = async (id: string) => {
  const data = await Admin.findById(id)
    .populate("userId")
    .populate("managementDepartment")
  return data
}

const updateAdmin = async (id: string, payload: Partial<IAdmin>) => {
  const { name, ...remainingData } = payload
  const updatedData: Record<string, unknown> = { ...remainingData }
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      updatedData[`name.${key}`] = value
    }
  }

  const data = await Admin.findByIdAndUpdate(id, updatedData, { new: true })
  return data
}

const deleteAdmin = async (id: string) => {
  const session = await startSession()
  try {
    session.startTransaction()

    const adminData = await Admin.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session }
    )
    if (!adminData) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete admin")
    }

    const userId = adminData?.userId
    const userData = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session }
    )
    if (!userData) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete admin")
    }

    await session.commitTransaction()
    await session.endSession()

    return adminData
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    error
  }
}

export const AdminServices = {
  getAllAdmins,
  getAdmin,
  updateAdmin,
  deleteAdmin,
}
