import { model, Schema } from "mongoose"
import { IUser } from "./user.interface"
import bcrypt from "bcrypt"
import config from "../../config"

const userSchema = new Schema<IUser>(
  {
    id: { type: String, require: [true, "Id is required"] },
    role: {
      type: String,
      enum: {
        values: ["student", "faculty", "admin"],
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
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    changePassword: { type: Boolean, default: true },
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

export const User = model<IUser>("User", userSchema)
