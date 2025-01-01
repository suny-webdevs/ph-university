import { model, Schema } from "mongoose"
import { ICourseMarks, IEnrolledCourse } from "./enrolledCourse.interface"
import { Grade } from "./enrolledCourse.constant"

const courseMarksSchema = new Schema<ICourseMarks>({
  classTestOne: { type: Number, min: 0, max: 10, default: 0 },
  midTerm: { type: Number, min: 0, max: 30, default: 0 },
  classTestTwo: { type: Number, min: 0, max: 10, default: 0 },
  finalTerm: { type: Number, min: 0, max: 50, default: 0 },
})

const enrolledCourseSchema = new Schema<IEnrolledCourse>(
  {
    semesterRegistration: {
      type: Schema.Types.ObjectId,
      ref: "SemesterRegistration",
      required: true,
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: "AcademicSemester",
      required: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: "AcademicFaculty",
      required: true,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: "AcademicDepartment",
      required: true,
    },
    offeredCourse: {
      type: Schema.Types.ObjectId,
      ref: "OfferedCourse",
      required: true,
    },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    student: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    faculty: { type: Schema.Types.ObjectId, ref: "Faculty", required: true },
    isEnrolled: { type: Boolean, default: false },
    courseMarks: { type: courseMarksSchema, required: true },
    grade: { type: String, enum: Grade, required: true },
    gradePoints: { type: Number, required: true },
    isCompleted: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export const EnrolledCourse = model<IEnrolledCourse>(
  "EnrolledCourse",
  enrolledCourseSchema
)
