import { model, Schema } from "mongoose"
import { IUser, UserModel } from "./user.interface"
import bcrypt from "bcrypt"
import config from "../../config"

const userSchema = new Schema<IUser, UserModel>(
  {
    id: { type: String, require: [true, "Id is required"] },
    role: {
      type: String,
      enum: {
        values: ["superAdmin", "student", "faculty", "admin"],
        message: "{VALUE} is not a valid role",
      },
      required: [true, "Role is required"],
    },
    status: {
      type: String,
      enum: {
        values: ["active", "in-progress", "blocked"],
        message: "{VALUE} is not a valid status",
      },
      default: "in-progress",
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: 0,
    },
    changePassword: { type: Boolean, default: true },
    passwordChangedAt: { type: Date },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
)

userSchema.pre("save", async function (next) {
  const user = this
  user.password = await bcrypt.hash(user.password, Number(config.salt_round))
  next()
})

userSchema.post("save", function (doc, next) {
  doc.password = ""
  next()
})

userSchema.statics.isPasswordMatched = async function (
  textedPassword,
  hashedPassword
) {
  return await bcrypt.compare(textedPassword, hashedPassword)
}

userSchema.statics.isTokenValidForChangePassword = function (
  changePasswordTime,
  jwtIssuedTime
) {
  const changedPasswordTime = new Date(changePasswordTime).getTime() / 1000
  return changedPasswordTime > jwtIssuedTime
}

export const User = model<IUser, UserModel>("User", userSchema)
