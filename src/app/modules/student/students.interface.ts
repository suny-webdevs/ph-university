import { Types } from "mongoose"

export interface IName {
  firstName: string
  middleName?: string
  lastName: string
}

export interface IGuardian {
  fatherName: string
  fatherOccupation: string
  fatherPhone: string
  motherName: string
  motherOccupation: string
  motherPhone: string
}

export interface IStudent {
  id: string
  userId: Types.ObjectId
  name: IName
  email: string
  phone: string
  image?: string
  gender: "male" | "female" | "others"
  dateOfBirth: string
  emergencyPhone: string
  bloodGroup: "A+" | "A-" | "AB+" | "AB-" | "O+" | "O-"
  presentAddress: string
  permanentAddress: string
  guardian: IGuardian
  academicDepartment: Types.ObjectId
  admissionSemester: Types.ObjectId
  isDeleted: boolean
}
