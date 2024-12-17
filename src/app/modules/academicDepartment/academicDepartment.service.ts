import { IAcademicDepartment } from "./academicDepartment.interface"
import { AcademicDepartment } from "./academicDepartment.model"

const createAcademicDepartment = async (payload: IAcademicDepartment) => {
  const data = await AcademicDepartment.create(payload)
  return data
}

const getAllAcademicDepartment = async () => {
  const data = await AcademicDepartment.find().populate("academicFaculty")
  return data
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
