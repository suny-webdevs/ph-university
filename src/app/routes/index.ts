import { Router } from "express"
import { UserRoutes } from "../modules/user/user.router"
import { StudentRoutes } from "../modules/student/students.route"
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.route"
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route"
import { AcademicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.route"
import { FacultyRoutes } from "../modules/faculty/faculty.route"
import { AdminRoutes } from "../modules/admin/admin.route"
import { CourseRoutes } from "../modules/course/course.route"

const router = Router()

const routes = [
  { path: "/users", route: UserRoutes },
  { path: "/students", route: StudentRoutes },
  { path: "/faculties", route: FacultyRoutes },
  { path: "/admins", route: AdminRoutes },
  { path: "/courses", route: CourseRoutes },
  { path: "/academic-semesters", route: AcademicSemesterRoutes },
  { path: "/academic-faculties", route: AcademicFacultyRoutes },
  { path: "/academic-departments", route: AcademicDepartmentRoutes },
]

routes.forEach((route) => router.use(route.path, route.route))

export default router