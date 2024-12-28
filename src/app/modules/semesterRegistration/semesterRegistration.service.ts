import QueryBuilder from "../../builder/QueryBuilder"
import AppError from "../../errors/AppError"
import { AcademicSemester } from "../academicSemester/academicSemester.model"
import { SemesterRegistrationStatus } from "./semesterRegistration.constant"
import { ISemesterRegistration } from "./semesterRegistration.interface"
import { SemesterRegistration } from "./semesterRegistration.model"
import httpStatus from "http-status"

const createSemesterRegistration = async (payload: ISemesterRegistration) => {
  const isUpcomingOrOngoingSemesterExists = await SemesterRegistration.findOne({
    $or: [{ status: "UPCOMING" }, { status: "ON-GOING" }],
  })

  if (isUpcomingOrOngoingSemesterExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already an ${isUpcomingOrOngoingSemesterExists.status} registered semester exists`
    )
  }

  const academicSemester = payload?.academicSemester
  const isAcademicSemesterExists = await AcademicSemester.findById(
    academicSemester
  )
  if (!isAcademicSemesterExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic semester not found!")
  }

  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  })
  if (isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      "This semester is already registered!"
    )
  }

  const data = await SemesterRegistration.create(payload)
  return data
}

const getAllSemesterRegistration = async (query: Record<string, unknown>) => {
  const semesterQuery = new QueryBuilder(
    SemesterRegistration.find().populate("academicSemester"),
    query
  )
    .filter()
    .sort()
    .pagination()
    .fields()
  const data = await semesterQuery.queryModel
  return data
}

const getSemesterRegistration = async (id: string) => {
  const data = await SemesterRegistration.findById(id)
  return data
}

const updateSemesterRegistration = async (
  id: string,
  payload: Partial<ISemesterRegistration>
) => {
  const isSemesterRegistrationExists = await SemesterRegistration.findById(id)
  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Semester registration not found!")
  }

  const currentSemesterStatus = isSemesterRegistrationExists?.status
  const requestSemesterStatus = payload?.status

  if (currentSemesterStatus === SemesterRegistrationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Cannot update an ended semester registration!"
    )
  }

  if (
    currentSemesterStatus === SemesterRegistrationStatus.ONGOING &&
    requestSemesterStatus === SemesterRegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Cannot update an ${currentSemesterStatus} semester registration to ${requestSemesterStatus}!`
    )
  }

  if (
    currentSemesterStatus === SemesterRegistrationStatus.UPCOMING &&
    requestSemesterStatus === SemesterRegistrationStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Cannot update an ${currentSemesterStatus} semester registration to ${requestSemesterStatus}!`
    )
  }

  const data = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return data
}

export const SemesterRegistrationServices = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSemesterRegistration,
  updateSemesterRegistration,
}
