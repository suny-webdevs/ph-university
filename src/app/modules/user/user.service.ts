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

//* Create student
const createUser = async (password: string, payload: IStudent) => {
  const user: Partial<IUser> = {}

  user.password = password || (config.default_password as string)
  user.role = "student"

  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester
  )

  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    user.id = await generateStudentId(admissionSemester as IAcademicSemester)

    // Create a user
    const newUser = await User.create([user], { session })

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user")
    }

    payload.id = newUser[0].id
    payload.userId = newUser[0]._id

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
    error
  }
}

//* Create faculty
const createFaculty = async (password: string, payload: IFaculty) => {
  const user: Partial<IUser> = {}

  user.password = password || (config.default_password as string)
  user.role = "faculty"

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
    error
  }
}

//* Create admin
const createAdmin = async (password: string, payload: IAdmin) => {
  const user: Partial<IUser> = {}

  user.password = password || (config.default_password as string)
  user.role = "admin"

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

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create faculty")
    }

    await session.commitTransaction()
    await session.endSession()

    return newAdmin
  } catch (error) {
    session.abortTransaction()
    session.endSession()
    error
  }
}

export const UserServices = {
  createUser,
  createFaculty,
  createAdmin,
}
