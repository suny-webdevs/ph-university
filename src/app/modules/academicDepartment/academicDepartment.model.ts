import { model, Schema } from "mongoose"
import { IAcademicDepartment } from "./academicDepartment.interface"
import AppError from "../../errors/AppError"
import httpStatus from "http-status"

const academicDepartmentSchema = new Schema<IAcademicDepartment>(
  {
    name: {
      type: String,
      required: [true, "Academic name is required"],
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: "AcademicFaculty",
      unique: true,
    },
  },
  { timestamps: true }
)

academicDepartmentSchema.pre("save", async function (next) {
  const isExist = await AcademicDepartment.findOne({ name: this.name })
  if (isExist) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, "Department already exist")
  }
  return next()
})

academicDepartmentSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery()
  const isExist = await AcademicDepartment.findOne(query)
  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Department does not exist")
  }
  return next()
})

export const AcademicDepartment = model<IAcademicDepartment>(
  "AcademicDepartment",
  academicDepartmentSchema
)
