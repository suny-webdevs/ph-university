import { Schema, model, Types } from "mongoose"
import { IOfferedCourse } from "./offeredCourse.interface"
import { Days } from "./offeredCourse.constant"

const OfferedCourseSchema = new Schema<IOfferedCourse>(
  {
    semesterRegistration: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "SemesterRegistration",
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "AcademicSemester",
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "AcademicFaculty",
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "AcademicDepartment",
    },
    course: { type: Schema.Types.ObjectId, required: true, ref: "Course" },
    faculty: { type: Schema.Types.ObjectId, required: true, ref: "Faculty" },
    maxCapacity: { type: Number, required: true },
    section: { type: Number, required: true },
    days: [
      {
        type: String,
        enum: Days,
        required: true,
      },
    ],
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

export const OfferedCourse = model<IOfferedCourse>(
  "OfferedCourse",
  OfferedCourseSchema
)
