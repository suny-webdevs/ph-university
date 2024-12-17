import { UserServices } from "./user.service"
import sendResponse from "../../utils/sendResponse"
import catchAsync from "../../utils/catchAsync"
import AppError from "../../errors/AppError"
import httpStatus from "http-status"
import { IStudent } from "../student/students.interface"

const createUser = catchAsync(async (req, res) => {
  const { password, student } = req.body
  const data = await UserServices.createUser(password, student)
  sendResponse(res, "User created", data)
})

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty } = req.body
  const data = await UserServices.createFaculty(password, faculty)
  sendResponse(res, "Faculty created", data)
})

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin } = req.body
  const data = await UserServices.createAdmin(password, admin)
  sendResponse(res, "Admin created", data)
})

export const UserControllers = {
  createUser,
  createFaculty,
  createAdmin,
}
