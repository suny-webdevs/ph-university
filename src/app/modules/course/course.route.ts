import { Router } from "express"
import { CourseControllers } from "./course.controller"
import validateRequest from "../../middlewares/validateRequest"
import { CourseValidationSchemas } from "./course.validation"

const router = Router()

router.post(
  "/create-course",
  validateRequest(CourseValidationSchemas.createCourseValidationSchema),
  CourseControllers.createCourse
)
router.get("", CourseControllers.getAllCourses)
router.get("/:id", CourseControllers.getCourse)
router.patch(
  "/:id",
  validateRequest(CourseValidationSchemas.updateCourseValidationSchema),
  CourseControllers.updateCourse
)
router.delete("/:id", CourseControllers.deleteCourse)

router.put(
  "/:id/assign-faculty",
  validateRequest(CourseValidationSchemas.courseFacultiesValidationSchema),
  CourseControllers.assignCourseFaculties
)
router.delete("/:id/remove-faculty", CourseControllers.removeCourseFaculties)

export const CourseRoutes = router
