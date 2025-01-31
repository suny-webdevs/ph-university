import QueryBuilder from "../../builder/QueryBuilder"
import { AcademicFacultySearchableFields } from "./academicFaculty.constant"
import { IAcademicFaculty } from "./academicFaculty.interface"
import { AcademicFaculty } from "./academicFaculty.model"

const createAcademicFaculty = async (payload: IAcademicFaculty) => {
  const data = await AcademicFaculty.create(payload)
  return data
}

const getAllAcademicFaculty = async (query: Record<string, unknown>) => {
  const academicFacultyQuery = new QueryBuilder(AcademicFaculty.find(), query)
    .search(AcademicFacultySearchableFields)
    .filter()
    .sort()
    .pagination()
    .fields()

  const data = await academicFacultyQuery.queryModel
  const meta = await academicFacultyQuery.countTotal()

  return {
    data,
    meta,
  }
}

const getAcademicFaculty = async (id: string) => {
  const data = await AcademicFaculty.findById(id)
  return data
}

const updateAcademicFaculty = async (
  id: string,
  payload: Partial<IAcademicFaculty>
) => {
  const data = await AcademicFaculty.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return data
}

export const AcademicFacultyServices = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getAcademicFaculty,
  updateAcademicFaculty,
}
