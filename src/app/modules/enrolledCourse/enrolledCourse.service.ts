import { IEnrolledCourse } from "./enrolledCourse.interface"

const createEnrollCourse = async (payload: IEnrolledCourse) => {}

const getAllEnrollCourse = async (query: Record<string, unknown>) => {}

const getAEnrollCourse = async (id: string) => {}

const UpdateAEnrollCourse = async (
  id: string,
  payload: Partial<IEnrolledCourse>
) => {}

const deleteAEnrollCourse = async (id: string) => {}

export const EnrolledCourseServices = {
  createEnrollCourse,
  getAllEnrollCourse,
  getAEnrollCourse,
  UpdateAEnrollCourse,
  deleteAEnrollCourse,
}
