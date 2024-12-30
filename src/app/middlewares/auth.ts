import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync"
import { TUserRole } from "../modules/user/user.interface"
import AppError from "../errors/AppError"
import httpStatus from "http-status"
import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../config"
import { User } from "../modules/user/user.model"

const auth = (...requiredRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Look like you are not login")
    }

    const decoded = jwt.verify(
      token as string,
      config.jwt_access_secret as string
    ) as JwtPayload
    const { id, role, iat } = decoded

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
        )) ||
      (requiredRole && !requiredRole.includes(role))
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, "UNAUTHORIZED access")
    }

    req.user = decoded as JwtPayload

    next()
  })
}

export default auth
