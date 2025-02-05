import { Schema, model } from "mongoose"
import { IGuardian, IName, IStudent } from "./students.interface"
import AppError from "../../errors/AppError"
import { bloodGroup } from "./student.constant"

const studentNameSchema = new Schema<IName>({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
  },
})

const guardianSchema = new Schema<IGuardian>({
  fatherName: { type: String, required: [true, "Father name is required"] },
  fatherOccupation: {
    type: String,
    required: [true, "Father occupation is required"],
  },
  fatherPhone: { type: String, required: [true, "Father phone is required"] },
  motherName: { type: String, required: [true, "Mother name is required"] },
  motherOccupation: {
    type: String,
    required: [true, "Mother occupation is required"],
  },
  motherPhone: { type: String, required: [true, "Mother phone is required"] },
})

// Student Schema
const studentSchema = new Schema<IStudent>(
  {
    id: { type: String, unique: true, required: [true, "id is required"] },
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, "userId is required"],
      unique: true,
      ref: "User",
    },
    name: {
      type: studentNameSchema,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      unique: true,
    },
    phone: { type: String, required: [true, "Phone is required"] },
    image: { type: String },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "others"],
        message: "{VALUE} is not a valid gender",
      },
      required: [true, "Gender is required"],
    },
    dateOfBirth: {
      type: String,
      required: [true, "Date of birth is required"],
    },
    emergencyPhone: {
      type: String,
      required: [true, "Emergency contact is required"],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: bloodGroup,
        message: "{VALUE} is not a valid blood group",
      },
      required: [true, "Blood group is required"],
    },
    permanentAddress: {
      type: String,
      required: [true, "Permanent address is required"],
    },
    presentAddress: {
      type: String,
      required: [true, "Present address is required"],
    },
    guardian: {
      type: guardianSchema,
      required: [true, "Guardian is required"],
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: "AcademicDepartment",
      required: [true, "Academic department is required"],
    },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: "AcademicSemester",
      required: [true, "Academic department is required"],
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    // toJSON: { virtuals: true }
  }
)

// studentSchema.virtual("fullName").get(function () {
//   // return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`
//   return this?.name?.firstName + this?.name?.middleName + this?.name?.lastName
// })

studentSchema.pre("find", async function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

studentSchema.pre("findOne", async function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

studentSchema.pre("aggregate", async function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})

// studentSchema.pre("findOneAndDelete", async function (next) {
//   const isExist = await Student.findOne(this.getQuery())
//   if (!isExist) {
//     throw new AppError(httpStatus.BAD_REQUEST, "Student not found")
//   }
//   if (isExist.isDeleted) {
//     throw new AppError(httpStatus.BAD_GATEWAY, "Student already deleted")
//   }
//   next()
// })

// Student Model
export const Student = model<IStudent>("Student", studentSchema)
