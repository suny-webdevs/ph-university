import mongoose from "mongoose"
import config from "../../config"
import { IAcademicSemester } from "../academicSemester/academicSemester.interface"
import { AcademicSemester } from "../academicSemester/academicSemester.model"
import { IStudent } from "../student/students.interface"
import { Student } from "../student/students.model"
import { IUser } from "./user.interface"
import { User } from "./user.model"
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from "./user.utils"
import AppError from "../../errors/AppError"
import { IFaculty } from "../faculty/faculty.interface"
import { IAdmin } from "../admin/admin.interface"
import { Faculty } from "../faculty/faculty.model"
import { Admin } from "../admin/admin.model"
import { verifyToken } from "../auth/auth.utils"
import { JwtPayload } from "jsonwebtoken"
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary"

//* Create student
const createUser = async (file: any, password: string, payload: IStudent) => {
  const user: Partial<IUser> = {}

  user.password = password || (config.default_password as string)
  user.role = "student"
  user.email = payload.email

  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester
  )

  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    user.id = await generateStudentId(admissionSemester as IAcademicSemester)

    const imageName = `${(payload?.name?.firstName)
      .toLowerCase()
      .split(" ")
      .join("_")}_${user.id}`
    const { secure_url } = await sendImageToCloudinary(imageName, file?.path)

    // Create a user
    const newUser = await User.create([user], { session })

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user")
    }

    payload.id = newUser[0].id
    payload.userId = newUser[0]._id
    payload.image = secure_url

    // Create a student
    const newStudent = await Student.create([payload], { session })

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student")
    }

    await session.commitTransaction()
    await session.endSession()

    return newStudent
  } catch (error) {
    session.abortTransaction()
    session.endSession()
    throw error
  }
}

//* Create faculty
const createFaculty = async (password: string, payload: IFaculty) => {
  const user: Partial<IUser> = {}

  user.password = password || (config.default_password as string)
  user.role = "faculty"
  user.email = payload.email

  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    user.id = await generateFacultyId()

    // Create a user
    const newUser = await User.create([user], { session })

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create faculty")
    }

    payload.id = newUser[0].id
    payload.userId = newUser[0]._id

    // Create a faculty
    const newFaculty = await Faculty.create([payload], { session })

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create faculty")
    }

    await session.commitTransaction()
    await session.endSession()

    return newFaculty
  } catch (error) {
    session.abortTransaction()
    session.endSession()
  }
}

//* Create admin
const createAdmin = async (password: string, payload: IAdmin) => {
  const user: Partial<IUser> = {}

  user.password = password || (config.default_password as string)
  user.role = "admin"
  user.email = payload.email

  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    user.id = await generateAdminId()

    // Create a user
    const newUser = await User.create([user], { session })

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create faculty")
    }

    payload.id = newUser[0].id
    payload.userId = newUser[0]._id

    // Create a admin
    const newAdmin = await Admin.create([payload], { session })
    console.log("service : ", newAdmin)
    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create faculty")
    }

    await session.commitTransaction()
    await session.endSession()

    return newAdmin
  } catch (error) {
    session.abortTransaction()
    session.endSession()
    throw error
  }
}

const getAllUser = async () => {
  const data = await User.find()
  return data
}

const getMe = async (token: string) => {
  const decoded = verifyToken(
    token,
    config.jwt_access_secret as string
  ) as JwtPayload

  const { id, role } = decoded
  console.log({ id, role })

  let result = null
  if (role === "student") {
    result = await Student.findOne({ id })
  }
  if (role === "faculty") {
    result = await Faculty.findOne({ id })
  }
  if (role === "admin") {
    result = await Admin.findOne({ id })
  }

  return result
}

export const UserServices = {
  createUser,
  createFaculty,
  createAdmin,
  getAllUser,
  getMe,
}
