import { Types } from "mongoose"

export interface ICourseMarks {
  classTestOne: number
  midTerm: number
  classTestTwo: number
  finalTerm: number
}

export type TGrade = "A" | "B" | "C" | "D" | "F" | "NA"

export interface IEnrolledCourse {
  semesterRegistration: Types.ObjectId
  academicSemester: Types.ObjectId
  academicFaculty: Types.ObjectId
  academicDepartment: Types.ObjectId
  offeredCourse: Types.ObjectId
  course: Types.ObjectId
  student: Types.ObjectId
  faculty: Types.ObjectId
  isEnrolled: boolean
  courseMarks: ICourseMarks
  grade: TGrade
  gradePoints: number
  isCompleted: boolean
}
