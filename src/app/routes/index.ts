import { Router } from "express"
import { UserRoutes } from "../modules/user/user.router"
import { StudentRoutes } from "../modules/student/students.route"
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.route"
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route"
import { AcademicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.route"
import { FacultyRoutes } from "../modules/faculty/faculty.route"
import { AdminRoutes } from "../modules/admin/admin.route"
import { CourseRoutes } from "../modules/course/course.route"
import { SemesterRegistrationRoutes } from "../modules/semesterRegistration/semesterRegistration.route"
import { OfferedCourseRoutes } from "../modules/offeredCourse/offeredCourse..route"
import { AuthRoutes } from "../modules/auth/auth.route"
import { EnrolledCourseRoutes } from "../modules/enrolledCourse/enrolledCourse.route"

const router = Router()

const routes = [
  { path: "/auth", route: AuthRoutes },
  { path: "/users", route: UserRoutes },
  { path: "/students", route: StudentRoutes },
  { path: "/faculties", route: FacultyRoutes },
  { path: "/admins", route: AdminRoutes },
  { path: "/courses", route: CourseRoutes },
  { path: "/offered-courses", route: OfferedCourseRoutes },
  { path: "/enrolled-courses", route: EnrolledCourseRoutes },
  { path: "/academic-semesters", route: AcademicSemesterRoutes },
  { path: "/academic-faculties", route: AcademicFacultyRoutes },
  { path: "/academic-departments", route: AcademicDepartmentRoutes },
  { path: "/semester-registrations", route: SemesterRegistrationRoutes },
]

routes.forEach((route) => router.use(route.path, route.route))

export default router
