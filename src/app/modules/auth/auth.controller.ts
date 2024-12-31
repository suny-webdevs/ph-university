import config from "../../config"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { AuthServices } from "./auth.service"

const loginUser = catchAsync(async (req, res) => {
  const { accessToken, refreshToken, changePassword } =
    await AuthServices.loginUser(req.body)
  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
  })
  const data = { accessToken, changePassword }
  sendResponse(res, "Login", data)
})

const changePassword = catchAsync(async (req, res) => {
  const data = await AuthServices.changePassword(req.user, req.body)
  sendResponse(res, "Changed password", data)
})

const refreshToken = catchAsync(async (req, res) => {
  const data = await AuthServices.refreshToken(req.cookies.refreshToken)
  sendResponse(res, "Token refresh", data)
})

const forgetPassword = catchAsync(async (req, res) => {
  const data = await AuthServices.forgetPassword(req.body.id)
  sendResponse(res, "Reset link generated", null)
})

const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization
  const data = await AuthServices.resetPassword(token as string, req.body)
  sendResponse(res, "Token refresh", null)
})

export const AuthControllers = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
}
