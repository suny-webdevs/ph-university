import QueryBuilder from "../../builder/QueryBuilder"
import AppError from "../../errors/AppError"
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model"
import { AcademicDepartmentSearchableFields } from "./academicDepartment.constant"
import { IAcademicDepartment } from "./academicDepartment.interface"
import { AcademicDepartment } from "./academicDepartment.model"
import httpStatus from "http-status"

const createAcademicDepartment = async (payload: IAcademicDepartment) => {
  const { academicFaculty } = payload

  const isAcademicFacultyExists = await AcademicFaculty.findById(
    academicFaculty
  )
  if (!isAcademicFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic faculty is not found")
  }

  const data = await AcademicDepartment.create(payload)
  return data
}

const getAllAcademicDepartment = async (query: Record<string, unknown>) => {
  const academicDepartmentQuery = new QueryBuilder(
    AcademicDepartment.find().populate("academicFaculty"),
    query
  )
    .search(AcademicDepartmentSearchableFields)
    .filter()
    .sort()
    .pagination()
    .fields()

  const data = await academicDepartmentQuery.queryModel
  const meta = await academicDepartmentQuery.countTotal()

  return {
    data,
    meta,
  }
}

const getAcademicDepartment = async (id: string) => {
  const data = await AcademicDepartment.findById(id).populate("academicFaculty")
  return data
}

const updateAcademicDepartment = async (
  id: string,
  payload: IAcademicDepartment
) => {
  const data = await AcademicDepartment.findByIdAndUpdate(id, payload, {
    new: true,
  })
  return data
}

export const AcademicDepartmentServices = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getAcademicDepartment,
  updateAcademicDepartment,
}
