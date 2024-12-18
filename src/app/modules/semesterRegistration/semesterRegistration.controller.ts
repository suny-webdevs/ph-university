import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { SemesterRegistrationServices } from "./semesterRegistration.service"

const createSemesterRegistration = catchAsync(async (req, res) => {
  const data = await SemesterRegistrationServices.createSemesterRegistration(
    req.body
  )
  sendResponse(res, "Create semester registration", data)
})

const getAllSemesterRegistration = catchAsync(async (req, res) => {
  const data = await SemesterRegistrationServices.getAllSemesterRegistration(
    req.query
  )
  sendResponse(res, "Get all semester registrations", data)
})

const getSemesterRegistration = catchAsync(async (req, res) => {
  const data = await SemesterRegistrationServices.getSemesterRegistration(
    req.params.id
  )
  sendResponse(res, "Get semester registration", data)
})

const updateSemesterRegistration = catchAsync(async (req, res) => {
  const data = await SemesterRegistrationServices.updateSemesterRegistration(
    req.params.id,
    req.body
  )
  sendResponse(res, "Update semester registration", data)
})

export const SemesterRegistrationControllers = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSemesterRegistration,
  updateSemesterRegistration,
}
