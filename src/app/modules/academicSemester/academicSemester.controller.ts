import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { AcademicSemesterServices } from "./academicSemester.service"

const createAcademicSemester = catchAsync(async (req, res) => {
  const academicSemester = req.body
  const data = await AcademicSemesterServices.createAcademicSemester(
    academicSemester
  )
  sendResponse(res, "Academic semester created", data)
})

const getAcademicSemesters = catchAsync(async (req, res) => {
  const data = await AcademicSemesterServices.getAcademicSemesters()
  sendResponse(res, "Get academic semesters", data)
})

const getAcademicSemester = catchAsync(async (req, res) => {
  const id = req.params.id
  const data = await AcademicSemesterServices.getAcademicSemester(id)
  sendResponse(res, "Get academic semester", data)
})

const updateAcademicSemester = catchAsync(async (req, res) => {
  const id = req.params.id
  const payload = req.body
  const data = await AcademicSemesterServices.updateAcademicSemester(
    id,
    payload
  )
  sendResponse(res, "Update academic semester", data)
})

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAcademicSemesters,
  getAcademicSemester,
  updateAcademicSemester,
}
