export interface IUser {
  id: string
  role: "student" | "faculty" | "admin"
  status: "active" | "in-progress" | "blocked"
  password: string
  changePassword: boolean
  isDeleted: boolean
}
