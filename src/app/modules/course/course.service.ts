import { startSession } from "mongoose"
import QueryBuilder from "../../builder/QueryBuilder"
import AppError from "../../errors/AppError"
import { searchAbleFields } from "./course.contant"
import { ICourse, ICourseFaculties } from "./course.interface"
import { Course, CourseFaculties } from "./course.model"

const createCourse = async (payload: ICourse) => {
  const data = await Course.create(payload)
  return data
}

const getAllCourses = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate("preRequisiteCourses.course"),
    query
  )
    .search(searchAbleFields)
    .filter()
    .sort()
    .pagination()
    .fields()

  const data = await courseQuery.queryModel
  return data
}

const getCourse = async (id: string) => {
  const data = await Course.findById(id).populate("preRequisiteCourses.course")
  return data
}

const updateCourse = async (id: string, payload: Partial<ICourse>) => {
  const { preRequisiteCourses, ...remainingData } = payload

  const session = await startSession()

  try {
    session.startTransaction()
    const updatedRemainingData = await Course.findByIdAndUpdate(
      id,
      remainingData,
      { new: true, runValidators: true, session }
    )

    if (!updatedRemainingData) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course")
    }

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deletedPreRequisite = preRequisiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course)

      const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPreRequisite } },
          },
        },
        { new: true, runValidators: true, session }
      )

      if (!deletedPreRequisiteCourses) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          "Failed to remove pre requisite course"
        )
      }

      const newPreRequisite = preRequisiteCourses.filter(
        (el) => el.course && !el.isDeleted
      )

      const newPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPreRequisite } },
        },
        { new: true, runValidators: true, session }
      )

      if (!newPreRequisiteCourses) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          "Failed to add pre requisite course"
        )
      }
    }

    const data = await Course.findById(id).populate(
      "preRequisiteCourses.course"
    )

    await session.commitTransaction()
    await session.endSession()

    return data
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Internal server error"
    )
  }
}

const deleteCourse = async (id: string) => {
  const data = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  )
  return data
}

const assignCourseFaculties = async (
  id: string,
  payload: Partial<ICourseFaculties>
) => {
  const data = await CourseFaculties.findByIdAndUpdate(
    id,
    { course: id, $addToSet: { faculties: { $each: payload } } },
    {
      upsert: true,
      new: true,
    }
  )
  return data
}

const removeCourseFaculties = async (
  id: string,
  payload: Partial<ICourseFaculties>
) => {
  const data = await CourseFaculties.findByIdAndUpdate(
    id,
    { $pull: { faculties: { $in: payload } } },
    {
      new: true,
    }
  )
  return data
}

export const CourseServices = {
  createCourse,
  getAllCourses,
  getCourse,
  updateCourse,
  deleteCourse,
  assignCourseFaculties,
  removeCourseFaculties,
}
