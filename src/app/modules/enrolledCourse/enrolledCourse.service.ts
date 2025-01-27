import AppError from "../../errors/AppError"
import { OfferedCourse } from "../offeredCourse/offeredCourse.model"
import { IEnrolledCourse } from "./enrolledCourse.interface"
import httpStatus from "http-status"
import { EnrolledCourse } from "./enrolledCourse.model"
import { Student } from "../student/students.model"
import { startSession } from "mongoose"
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model"
import { Course } from "../course/course.model"

const createEnrollCourse = async (id: string, payload: IEnrolledCourse) => {
  const { offeredCourse } = payload

  const offeredCourseData = await OfferedCourse.findById(offeredCourse)

  if (!offeredCourseData) {
    throw new AppError(httpStatus.NOT_FOUND, "Offer course not found")
  }

  if (offeredCourseData?.maxCapacity <= 0) {
    throw new AppError(httpStatus.BAD_GATEWAY, "There is no available seat")
  }

  const student = await Student.findOne({ id }, { _id: 1 })

  const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
    semesterRegistration: offeredCourseData?.semesterRegistration,
    offeredCourse,
    student: student?._id,
  })

  if (isStudentAlreadyEnrolled) {
    throw new AppError(httpStatus.CONFLICT, "Course already enrolled")
  }

  const course = await Course.findById(offeredCourseData?.course)
  const currentCredit = course?.credits

  const semesterRegistration = offeredCourseData?.semesterRegistration
  const semesterRegistrationData = await SemesterRegistration.findById(
    semesterRegistration
  ).select("maxCredit")
  const maxCredit = semesterRegistrationData?.maxCredit

  const enrolledCourses = await EnrolledCourse.aggregate([
    {
      $match: {
        semesterRegistration: semesterRegistration,
        student: student?._id,
      },
    },
    {
      $lookup: {
        from: "courses",
        localField: "course",
        foreignField: "_id",
        as: "enrolledCourseData",
      },
    },
    {
      $unwind: "$enrolledCourseData",
    },
    {
      $group: {
        _id: null,
        totalEnrolledCredits: { $sum: "$enrolledCourseData.credits" },
      },
    },
    {
      $project: { _id: 0, totalEnrolledCredits: 1 },
    },
  ])

  console.log("enrolled course : ", enrolledCourses)

  const totalCredits =
    enrolledCourses.length > 0 ? enrolledCourses[0].totalEnrolledCourses : 0

  console.log("total credits : ", totalCredits)
  if (totalCredits && maxCredit && totalCredits + currentCredit > maxCredit) {
    throw new AppError(httpStatus.BAD_REQUEST, "You course credit is full")
  }

  const session = await startSession()

  try {
    session.startTransaction()
    // session-1
    const data = await EnrolledCourse.create(
      [
        {
          semesterRegistration: offeredCourseData?.semesterRegistration,
          academicSemester: offeredCourseData?.academicSemester,
          academicFaculty: offeredCourseData?.academicFaculty,
          academicDepartment: offeredCourseData?.academicDepartment,
          offeredCourse,
          course: offeredCourseData?.course,
          student: student?._id,
          faculty: offeredCourseData?.faculty,
        },
      ],
      { session }
    )

    if (!data) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to enroll")
    }

    let maxCapacity = offeredCourseData?.maxCapacity
    // session-2
    await OfferedCourse.findByIdAndUpdate(
      [offeredCourse],
      { maxCapacity: --maxCapacity },
      { new: true, session }
    )

    await session.commitTransaction()
    await session.endSession()

    return data
  } catch (error: any) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
}

const getAllEnrollCourse = async (query: Record<string, unknown>) => {}

const getAEnrollCourse = async (id: string) => {}

// const UpdateAEnrollCourse = async (
//   id: string,
//   payload: Partial<IEnrolledCourse>
// ) => {}

// const deleteAEnrollCourse = async (id: string) => {}

export const EnrolledCourseServices = {
  createEnrollCourse,
  getAllEnrollCourse,
  getAEnrollCourse,
  // UpdateAEnrollCourse,
  // deleteAEnrollCourse,
}
