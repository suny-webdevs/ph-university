import { model, Schema } from "mongoose"
import { IAcademicSemester } from "./academicSemester.interface"
import {
  AcademicSemesterCodes,
  AcademicSemesterNames,
  Months,
} from "./academicSemester.constant"

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    name: {
      type: String,
      enum: {
        values: AcademicSemesterNames,
        message: "{VALUE} is not a valid semester name",
      },
      required: [true, "Name is required"],
    },
    code: {
      type: String,
      enum: {
        values: AcademicSemesterCodes,
        message: "{VALUE} is not a valid semester code",
      },
      required: [true, "Code is required"],
    },
    year: { type: String, required: [true, "Year is required"] },
    startMonth: {
      type: String,
      enum: { values: Months, message: "{VALUE} is not a valid month" },
      required: [true, "Start month is required"],
    },
    endMonth: {
      type: String,
      enum: { values: Months, message: "{VALUE} is not a valid month" },
      required: [true, "End month is required"],
    },
  },
  { timestamps: true }
)

academicSemesterSchema.pre("save", async function (next) {
  const isSemesterExist = await AcademicSemester.findOne({
    name: this.name,
    year: this.year,
  })
  if (isSemesterExist) {
    throw new Error("Semester already exists")
  }
})

export const AcademicSemester = model<IAcademicSemester>(
  "AcademicSemester",
  academicSemesterSchema
)
