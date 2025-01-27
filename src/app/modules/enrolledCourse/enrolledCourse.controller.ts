import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { EnrolledCourseServices } from "./enrolledCourse.service"

export const createEnrollCourse = catchAsync(async (req, res) => {
  const data = await EnrolledCourseServices.createEnrollCourse(
    req.user.id,
    req.body
  )
  sendResponse(res, "Course enrolled", data)
})

export const getAllEnrollCourse = catchAsync(async (req, res) => {
  const data = await EnrolledCourseServices.getAllEnrollCourse(req.query)
  sendResponse(res, "Course enrolled", data)
})

export const getAEnrollCourse = catchAsync(async (req, res) => {
  const data = await EnrolledCourseServices.getAEnrollCourse(req.params.id)
  sendResponse(res, "Course enrolled", data)
})

// export const updateAEnrollCourse = catchAsync(async (req, res) => {
//   const data = await EnrolledCourseServices.UpdateAEnrollCourse(
//     req.params.id,
//     req.body
//   )
//   sendResponse(res, "Course enrolled", data)
// })

// export const deleteAEnrollCourse = catchAsync(async (req, res) => {
//   const data = await EnrolledCourseServices.deleteAEnrollCourse(req.params.id)
//   sendResponse(res, "Course enrolled", data)
// })
