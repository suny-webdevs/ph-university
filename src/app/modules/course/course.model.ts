import { model, Schema } from "mongoose"
import {
  ICourse,
  ICourseFaculties,
  IPreRequisiteCourses,
} from "./course.interface"

const preRequisiteCoursesSchema = new Schema<IPreRequisiteCourses>({
  course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  isDeleted: { type: Boolean, default: false },
})

const courseSchema = new Schema<ICourse>(
  {
    title: { type: String, unique: true, trim: true, required: true },
    prefix: { type: String, trim: true, required: true },
    code: { type: String, trim: true, required: true },
    credits: { type: String, trim: true, required: true },
    preRequisiteCourses: { type: [preRequisiteCoursesSchema] },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
)

const courseFacultiesSchema = new Schema<ICourseFaculties>({
  course: { type: Schema.Types.ObjectId, ref: "Course", unique: true },
  faculties: [{ type: Schema.Types.ObjectId, ref: "Faculty" }],
})

export const Course = model<ICourse>("Course", courseSchema)
export const CourseFaculties = model<ICourseFaculties>(
  "CourseFaculties",
  courseFacultiesSchema
)
