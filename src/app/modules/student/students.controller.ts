import { StudentServices } from "./students.services"
import sendResponse from "../../utils/sendResponse"
import catchAsync from "../../utils/catchAsync"

const getAllStudents = catchAsync(async (req, res) => {
  const data = await StudentServices.getAllStudentsFromDB(req.query)
  sendResponse(res, "Get all students", data)
})

const getStudent = catchAsync(async (req, res) => {
  const data = await StudentServices.getStudentFromDB(req.params.id)
  sendResponse(res, "Get student", data)
})

const updateStudent = catchAsync(async (req, res) => {
  const { id } = req.params
  const { student } = req.body
  const data = await StudentServices.updateStudentFromDB(id, student)
  sendResponse(res, "Update student", data)
})

const deleteStudent = catchAsync(async (req, res) => {
  const data = await StudentServices.deleteStudentFromDB(req.params.id)
  sendResponse(res, "Delete student", data)
})

export const StudentControllers = {
  getAllStudents,
  getStudent,
  updateStudent,
  deleteStudent,
}
