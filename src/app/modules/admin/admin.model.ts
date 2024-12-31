import { model, Schema } from "mongoose"
import { IAdmin, IAdminName } from "./admin.interface"

const adminNameSchema = new Schema<IAdminName>({
  firstName: { type: String, required: [true, "First name is required"] },
  middleName: { type: String },
  lastName: { type: String, required: [true, "Last name is required"] },
})

const adminSchema = new Schema<IAdmin>(
  {
    id: { type: String, required: [true, "Id is required"], unique: true },
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, "User id is required"],
      unique: true,
      ref: "User",
    },
    name: { type: adminNameSchema, required: [true, "Name is required"] },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      unique: true,
    },
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
    contactNo: { type: String, required: [true, "Contact number is required"] },
    emergencyContactNo: {
      type: String,
      required: [true, "Emergency contact number is required"],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ["A+", "A-", "AB+", "AB-", "O+", "O-"],
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
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: [true, "Management department is required"],
      ref: "AcademicDepartment",
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export const Admin = model<IAdmin>("Admin", adminSchema)
