import QueryBuilder from "../../builder/QueryBuilder"
import AppError from "../../errors/AppError"
import { AcademicSemester } from "../academicSemester/academicSemester.model"
import { ISemesterRegistration } from "./semesterRegistration.interface"
import { SemesterRegistration } from "./semesterRegistration.model"

const createSemesterRegistration = async (payload: ISemesterRegistration) => {
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
  const data = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
  })
  return data
}

export const SemesterRegistrationServices = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSemesterRegistration,
  updateSemesterRegistration,
}
