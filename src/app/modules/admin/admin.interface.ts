import { Types } from "mongoose"

export interface IAdminName {
  firstName: string
  middleName?: string
  lastName: string
}

export interface IAdmin {
  id: string
  userId: Types.ObjectId
  name: IAdminName
  email: string
  image?: string
  gender: "male" | "female" | "others"
  dateOfBirth: string
  contactNo: string
  emergencyContactNo: string
  bloodGroup: "A+" | "A-" | "AB+" | "AB-" | "O+" | "O-"
  presentAddress: string
  permanentAddress: string
  academicDepartment: Types.ObjectId
  isDeleted: boolean
}
