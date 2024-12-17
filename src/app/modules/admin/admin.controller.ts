import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { AdminServices } from "./admin.service"

const getAllAdmins = catchAsync(async (req, res) => {
  const data = await AdminServices.getAllAdmins(req.query)
  sendResponse(res, "Get all admins", data)
})

const getAdmin = catchAsync(async (req, res) => {
  const data = await AdminServices.getAdmin(req.params.id)
  sendResponse(res, "Get admin", data)
})

const updateAdmin = catchAsync(async (req, res) => {
  const data = await AdminServices.updateAdmin(req.params.id, req.body)
  sendResponse(res, "Update admin", data)
})

const deleteAdmin = catchAsync(async (req, res) => {
  const data = await AdminServices.deleteAdmin(req.params.id)
  sendResponse(res, "Delete admin", data)
})

export const AdminControllers = {
  getAllAdmins,
  getAdmin,
  updateAdmin,
  deleteAdmin,
}
