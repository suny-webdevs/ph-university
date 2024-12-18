import { model, Schema } from "mongoose"
import { ISemesterRegistration } from "./semesterRegistration.interface"
import { semesterRegistrationStatus } from "./semesterRegistration.constant"

const semesterRegistrationSchema = new Schema<ISemesterRegistration>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: "AcademicSemester",
      unique: true,
      required: true,
    },
    status: {
      type: String,
      enum: semesterRegistrationStatus,
      default: "UPCOMING",
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    minCredit: { type: Number, required: true },
    maxCredit: { type: Number, required: true },
  },
  { timestamps: true }
)

export const SemesterRegistration = model<ISemesterRegistration>(
  "SemesterRegistration",
  semesterRegistrationSchema
)
