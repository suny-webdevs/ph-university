import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { AcademicDepartmentServices } from "./academicDepartment.service"

const createAcademicDepartment = catchAsync(async (req, res) => {
  const data = await AcademicDepartmentServices.createAcademicDepartment(
    req.body
  )
  sendResponse(res, "Academic department created", data)
})

const getAllAcademicDepartments = catchAsync(async (req, res) => {
  const { data, meta } =
    await AcademicDepartmentServices.getAllAcademicDepartment(req.query)
  sendResponse(res, "Get all academic departments", { data, meta })
})

const getAcademicDepartment = catchAsync(async (req, res) => {
  const id = req.params.id
  const data = await AcademicDepartmentServices.getAcademicDepartment(id)
  sendResponse(res, "Get academic department", data)
})

const updateAcademicDepartment = catchAsync(async (req, res) => {
  const id = req.params.id
  const payload = req.body
  const data = await AcademicDepartmentServices.updateAcademicDepartment(
    id,
    payload
  )
  sendResponse(res, "Update academic department", data)
})

export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartments,
  getAcademicDepartment,
  updateAcademicDepartment,
}
