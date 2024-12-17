import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { AcademicFacultyServices } from "./academicFaculty.service"

const createAcademicFaculty = catchAsync(async (req, res) => {
  const academicFaculty = req.body
  const data = await AcademicFacultyServices.createAcademicFaculty(
    academicFaculty
  )
  sendResponse(res, "Academic faculty created", data)
})

const getAllAcademicFaculty = catchAsync(async (req, res) => {
  const data = await AcademicFacultyServices.getAllAcademicFaculty()
  sendResponse(res, "Get academic faculties", data)
})

const getAcademicFaculty = catchAsync(async (req, res) => {
  const id = req.params.id
  const data = await AcademicFacultyServices.getAcademicFaculty(id)
  sendResponse(res, "Get academic faculty", data)
})

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const id = req.params.id
  const payload = req.body
  const data = await AcademicFacultyServices.updateAcademicFaculty(id, payload)
  sendResponse(res, "Update academic faculty", data)
})

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getAcademicFaculty,
  updateAcademicFaculty,
}
