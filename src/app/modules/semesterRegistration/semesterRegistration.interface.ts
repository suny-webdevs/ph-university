import { Types } from "mongoose"

export interface ISemesterRegistration {
  academicSemester: Types.ObjectId
  status: "UPCOMING" | "ON-GOING" | "ENDED"
  startDate: Date
  endDate: Date
  minCredit: number
  maxCredit: number
}
