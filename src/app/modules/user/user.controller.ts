import { UserServices } from "./user.service"
import sendResponse from "../../utils/sendResponse"
import catchAsync from "../../utils/catchAsync"

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
  // console.log("controller : ", data)
  sendResponse(res, "Admin created", data)
})

const getAllUser = catchAsync(async (req, res) => {
  const data = await UserServices.getAllUser()
  sendResponse(res, "Admin created", data)
})

export const UserControllers = {
  createUser,
  createFaculty,
  createAdmin,
  getAllUser,
}
