import { Types } from "mongoose"

export interface IName {
  firstName: string
  middleName?: string
  lastName: string
}

export interface IFaculty {
  id: string
  userId: Types.ObjectId
  name: IName
  email: string
  phone: string
  image?: string
  designation: string
  gender: "male" | "female" | "others"
  dateOfBirth: string
  emergencyPhone: string
  bloodGroup: "A+" | "A-" | "AB+" | "AB-" | "O+" | "O-"
  presentAddress: string
  permanentAddress: string
  academicDepartment: Types.ObjectId
  academicFaculty: Types.ObjectId
  isDeleted: boolean
}
