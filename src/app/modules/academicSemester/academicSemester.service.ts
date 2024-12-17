import { academicSemesterNameCodeMapper } from "./academicSemester.constant"
import { IAcademicSemester } from "./academicSemester.interface"
import { AcademicSemester } from "./academicSemester.model"

const createAcademicSemester = async (payload: IAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error("Semester code is not valid")
  }
  const data = await AcademicSemester.create(payload)
  return data
}

const getAcademicSemesters = async () => {
  const data = await AcademicSemester.find()
  return data
}

const getAcademicSemester = async (id: string) => {
  const data = await AcademicSemester.findById(id)
  return data
}

const updateAcademicSemester = async (
  id: string,
  payload: Partial<IAcademicSemester>
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error("Invalid semester code")
  }
  const isExist = await AcademicSemester.findOne({ name: payload.name })
  if (isExist) {
    throw new Error("Semester already exist")
  }

  const data = await AcademicSemester.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return data
}

export const AcademicSemesterServices = {
  createAcademicSemester,
  getAcademicSemesters,
  getAcademicSemester,
  updateAcademicSemester,
}
