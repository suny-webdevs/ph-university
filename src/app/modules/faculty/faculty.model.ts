import { model, Schema } from "mongoose"
import { IFaculty, IName } from "./faculty.interface"

const userNameSchema = new Schema<IName>({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trie: true,
  },
  middleName: { type: String, trie: true },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trie: true,
  },
})

const facultySchema = new Schema<IFaculty>(
  {
    id: { type: String, unique: true, required: [true, "id is required"] },
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, "userId is required"],
      unique: true,
      ref: "User",
    },
    name: {
      type: userNameSchema,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    phone: { type: String, required: [true, "Phone is required"] },
    image: { type: String },
    designation: { type: String, required: [true, "Designation is required"] },
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
      required: [true, "Academic department is required"],
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: [true, "Academic faculty is required"],
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export const Faculty = model<IFaculty>("Faculty", facultySchema)
