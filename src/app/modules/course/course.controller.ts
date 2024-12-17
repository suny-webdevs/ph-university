import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { CourseServices } from "./course.service"

const createCourse = catchAsync(async (req, res) => {
  const data = await CourseServices.createCourse(req.body)
  sendResponse(res, "Course create", data)
})

const getAllCourses = catchAsync(async (req, res) => {
  const data = await CourseServices.getAllCourses(req.query)
  sendResponse(res, "Get all courses", data)
})

const getCourse = catchAsync(async (req, res) => {
  const data = await CourseServices.getCourse(req.params.id)
  sendResponse(res, "Get course", data)
})

const updateCourse = catchAsync(async (req, res) => {
  const data = await CourseServices.updateCourse(req.params.id, req.body)
  sendResponse(res, "Update course", data)
})

const deleteCourse = catchAsync(async (req, res) => {
  const data = await CourseServices.deleteCourse(req.params.id)
  sendResponse(res, "Delete course", data)
})

const assignCourseFaculties = catchAsync(async (req, res) => {
  const data = await CourseServices.assignCourseFaculties(
    req.params.id,
    req.body
  )
  sendResponse(res, "Assign faculty's in course", data)
})

const removeCourseFaculties = catchAsync(async (req, res) => {
  const data = await CourseServices.removeCourseFaculties(
    req.params.id,
    req.body
  )
  sendResponse(res, "Remove faculty's from course", data)
})

export const CourseControllers = {
  createCourse,
  getAllCourses,
  getCourse,
  updateCourse,
  deleteCourse,
  assignCourseFaculties,
  removeCourseFaculties,
}
