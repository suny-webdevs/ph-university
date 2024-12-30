import AppError from "../../errors/AppError"
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model"
import { Course } from "../course/course.model"
import { Faculty } from "../faculty/faculty.model"
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model"
import { IOfferedCourse } from "./offeredCourse.interface"
import httpStatus from "http-status"
import { OfferedCourse } from "./offeredCourse.model"
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model"
import { hasTimeConflict } from "./offeredCourse.utils"
import QueryBuilder from "../../builder/QueryBuilder"
import { AcademicSemester } from "../academicSemester/academicSemester.model"

const createOfferedCourse = async (payload: IOfferedCourse) => {
  const {
    semesterRegistration,
    academicDepartment,
    course,
    faculty,
    section,
    days,
    startTime,
    endTime,
  } = payload

  const isSemesterRegistrationExist = await SemesterRegistration.findById(
    semesterRegistration
  )
  if (!isSemesterRegistrationExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Semester registration does not exist"
    )
  }

  const academicSemester = isSemesterRegistrationExist?.academicSemester

  const isAcademicDepartmentExist = await AcademicDepartment.findById(
    academicDepartment
  )
  if (!isAcademicDepartmentExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Academic department does not exist"
    )
  }

  const academicFaculty = isAcademicDepartmentExist?.academicFaculty

  const isCourseExist = await Course.findById(course)
  if (!isCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Course does not exist")
  }

  const isFacultyExist = await Faculty.findById(faculty)
  if (!isFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Faculty does not exist")
  }

  const isAcademicFacultyExist = await AcademicFaculty.findById(academicFaculty)
  if (!isAcademicFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic faculty does not exist")
  }

  const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
    _id: academicDepartment,
    academicFaculty,
  })

  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This ${isAcademicDepartmentExist?.name} is not  belong to this ${isAcademicFacultyExist.name}`
    )
  }

  // check if the same offered course same section in same registered semester exists

  const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection =
    await OfferedCourse.findOne({
      semesterRegistration,
      course,
      section,
    })

  if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered course with same section is already exist!`
    )
  }

  // get the schedules of the faculties
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select("days startTime endTime")

  const newSchedule = {
    days,
    startTime,
    endTime,
  }

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This faculty is not available at that time! Choose other time or day`
    )
  }

  const data = await OfferedCourse.create({
    ...payload,
    academicSemester,
    academicFaculty,
  })
  return data
}

const getAllOfferedCourses = async (query: Record<string, unknown>) => {
  const offeredCourseQuery = new QueryBuilder(
    OfferedCourse.find()
      .populate({
        path: "semesterRegistration",
        populate: { path: "academicSemester" },
      })
      .populate("academicSemester")
      .populate("academicFaculty")
      .populate({
        path: "academicDepartment",
        populate: { path: "academicFaculty" },
      })
      .populate("course")
      .populate("faculty"),
    query
  )
    .filter()
    .sort()
    .pagination()
    .fields()

  const data = await offeredCourseQuery.queryModel
  return data
}

const getAOfferedCourse = async (id: string) => {
  const offeredCourse = await OfferedCourse.findById(id)

  if (!offeredCourse) {
    throw new AppError(404, "Offered Course not found")
  }

  return offeredCourse
}

const updateOfferedCourse = async (id: string, payload: IOfferedCourse) => {
  const { faculty, days, startTime, endTime } = payload

  const isOfferedCourseExists = await OfferedCourse.findById(id)

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Offered course not found !")
  }

  const isFacultyExists = await Faculty.findById(faculty)

  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Faculty not found !")
  }

  const semesterRegistration = isOfferedCourseExists.semesterRegistration
  // get the schedules of the faculties

  // Checking the status of the semester registration
  const semesterRegistrationStatus = await SemesterRegistration.findById(
    semesterRegistration
  )

  if (semesterRegistrationStatus?.status !== "UPCOMING") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not update this offered course as it is ${semesterRegistrationStatus?.status}`
    )
  }

  // check if the faculty is available at that time.
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select("days startTime endTime")

  const newSchedule = {
    days,
    startTime,
    endTime,
  }

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This faculty is not available at that time ! Choose other time or day`
    )
  }

  const data = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
  })
  return data
}

const deleteOfferedCourse = async (id: string) => {
  const isOfferedCourseExists = await OfferedCourse.findById(id)

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Offered Course not found")
  }

  const semesterRegistration = isOfferedCourseExists.semesterRegistration

  const semesterRegistrationStatus = await SemesterRegistration.findById(
    semesterRegistration
  ).select("status")

  if (semesterRegistrationStatus?.status !== "UPCOMING") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered course can not update ! because the semester ${semesterRegistrationStatus}`
    )
  }

  const data = await OfferedCourse.findByIdAndDelete(id)

  return data
}

export const OfferedCourseServices = {
  createOfferedCourse,
  getAllOfferedCourses,
  getAOfferedCourse,
  updateOfferedCourse,
  deleteOfferedCourse,
}
