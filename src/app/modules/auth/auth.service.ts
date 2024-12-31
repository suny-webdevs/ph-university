import AppError from "../../errors/AppError"
import { User } from "../user/user.model"
import { IAuth, IChangePassword } from "./auth.interface"
import httpStatus from "http-status"
import createToken from "./auth.utils"
import config from "../../config"
import { JwtPayload } from "jsonwebtoken"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { sendMail } from "../../utils/sendMail"

const loginUser = async (payload: IAuth) => {
  if (payload.id === "" || payload.password === "") {
    throw new AppError(httpStatus.CONFLICT, "Invalid ID or password")
  }

  const user = await User.findOne({ id: payload.id }).select("+password")
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found")
  }

  const isDeleted = user?.isDeleted
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "User was deleted")
  }

  const userStatus = user?.status
  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "User was blocked")
  }

  const isPasswordMatched = await User.isPasswordMatched(
    payload.password,
    user?.password
  )
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, "Invalid password")
  }

  const jwtPayload = {
    id: user.id,
    role: user.role,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  )

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  )

  return { accessToken, refreshToken, changePassword: user?.changePassword }
}

const changePassword = async (user: JwtPayload, payload: IChangePassword) => {
  const userData = await User.findOne({ id: user.id }).select("+password")

  const isPasswordMatched = await User.isPasswordMatched(
    payload.oldPassword,
    userData?.password as string
  )
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, "Invalid old password")
  }

  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.salt_round)
  )

  await User.findOneAndUpdate(
    { id: user.id, role: user.role },
    {
      password: newHashedPassword,
      changePassword: false,
      passwordChangedAt: new Date(),
    }
  )
  return {}
}

const refreshToken = async (token: string) => {
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Look like you are not login")
  }

  const decoded = jwt.verify(
    token as string,
    config.jwt_refresh_secret as string
  ) as JwtPayload

  const { id, iat } = decoded

  // Finding user by custom id from token
  const user = await User.findOne({ id })

  // Checking if user is not exists
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found")
  }

  // Checking if user is deleted or user is blocked or required roll not exists
  if (
    user?.isDeleted ||
    user?.status === "blocked" ||
    (user?.passwordChangedAt &&
      User.isTokenValidForChangePassword(
        user?.passwordChangedAt,
        iat as number
      ))
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, "UNAUTHORIZED access")
  }

  const jwtPayload = {
    id: user.id,
    role: user.role,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  )

  return { accessToken }
}

const forgetPassword = async (id: string) => {
  const user = await User.findOne({ id })

  // Checking if user is not exists
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found")
  }

  // Checking if user is deleted or user is blocked or required roll not exists
  if (user?.isDeleted || user?.status === "blocked") {
    throw new AppError(httpStatus.UNAUTHORIZED, "UNAUTHORIZED access")
  }

  const jwtPayload = {
    id: user.id,
    role: user.role,
  }

  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    "10m"
  )

  const resetLink = `${config.client_url}?id=${user.id}&token=${resetToken}`
  sendMail(
    user?.email,
    "Reset your password",
    "Reset your password within 10 minutes.",
    `${resetLink}`
  )
  console.log(resetLink)
}

const resetPassword = async (
  token: string,
  payload: { id: string; newPassword: string }
) => {
  const user = await User.findOne({ id: payload?.id })

  // Checking if user is not exists
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found")
  }

  // Checking if user is deleted or user is blocked or required roll not exists
  if (user?.isDeleted || user?.status === "blocked") {
    throw new AppError(httpStatus.UNAUTHORIZED, "UNAUTHORIZED access")
  }
}

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
}
