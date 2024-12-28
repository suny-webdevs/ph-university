import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { OfferedCourseServices } from "./offeredCourse.service"

const createOfferedCourse = catchAsync(async (req, res) => {
  const data = await OfferedCourseServices.createOfferedCourse(req.body)
  sendResponse(res, "Create offered course", data)
})

const getAllOfferedCourses = catchAsync(async (req, res) => {
  const data = await OfferedCourseServices.getAllOfferedCourses(req.query)
  sendResponse(res, "Get all offered courses", data)
})

const getAOfferedCourse = catchAsync(async (req, res) => {
  const data = await OfferedCourseServices.getAOfferedCourse(req.params.id)
  sendResponse(res, "Get an offered course", data)
})

const updateOfferedCourse = catchAsync(async (req, res) => {
  const data = await OfferedCourseServices.updateOfferedCourse(
    req.params.id,
    req.body
  )
  sendResponse(res, "Update offered course", data)
})

const deleteOfferedCourse = catchAsync(async (req, res) => {
  const data = await OfferedCourseServices.deleteOfferedCourse(req.params.id)
  sendResponse(res, "Delete offered course", data)
})

export const OfferedCourseControllers = {
  createOfferedCourse,
  getAllOfferedCourses,
  getAOfferedCourse,
  updateOfferedCourse,
  deleteOfferedCourse,
}
