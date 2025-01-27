import { Model } from "mongoose"
import { USER_ROLE } from "./user.constant"

export interface IUser {
  id: string
  role: "superAdmin" | "student" | "faculty" | "admin"
  status: "active" | "in-progress" | "blocked"
  email: string
  password: string
  changePassword: boolean
  passwordChangedAt?: Date
  isDeleted: boolean
}

export interface UserModel extends Model<IUser> {
  isPasswordMatched(
    textedPassword: string,
    hashedPassword: string
  ): Promise<boolean>
  isTokenValidForChangePassword(
    changePasswordTime: Date,
    jwtIssuedTime: number
  ): boolean
}

export type TUserRole = keyof typeof USER_ROLE
