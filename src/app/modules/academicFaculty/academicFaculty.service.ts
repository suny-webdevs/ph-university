import { IAcademicFaculty } from "./academicFaculty.interface"
import { AcademicFaculty } from "./academicFaculty.model"

const createAcademicFaculty = async (payload: IAcademicFaculty) => {
  const data = await AcademicFaculty.create(payload)
  return data
}

const getAllAcademicFaculty = async () => {
  const data = await AcademicFaculty.find()
  return data
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
