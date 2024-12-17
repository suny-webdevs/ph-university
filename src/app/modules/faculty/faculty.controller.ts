import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { FacultyServices } from "./faculty.service"

const getAllFaculties = catchAsync(async (req, res) => {
  const data = await FacultyServices.getAllFaculties(req.query)
  sendResponse(res, "Get all faculties", data)
})

const getFaculty = catchAsync(async (req, res) => {
  const data = await FacultyServices.getFaculty(req.params.id)
  sendResponse(res, "Get faculty", data)
})

const updateFaculty = catchAsync(async (req, res) => {
  const data = await FacultyServices.updateFaculty(req.params.id, req.body)
  sendResponse(res, "Update faculty", data)
})

const deleteFaculty = catchAsync(async (req, res) => {
  const data = await FacultyServices.deleteFaculty(req.params.id)
  sendResponse(res, "Delete faculty", data)
})

export const FacultyControllers = {
  getAllFaculties,
  getFaculty,
  updateFaculty,
  deleteFaculty,
}
