import { Router } from "express"
import {
  createEnrollCourse,
  deleteAEnrollCourse,
  getAEnrollCourse,
  getAllEnrollCourse,
  updateAEnrollCourse,
} from "./enrolledCourse.controller"
import validateRequest from "../../middlewares/validateRequest"
import { createEnrollCourseValidationSchema } from "./enrolledCourse.validation"
import auth from "../../middlewares/auth"

const router = Router()

router.post(
  "/enroll-course",
  auth("student"),
  validateRequest(createEnrollCourseValidationSchema),
  createEnrollCourse
)
router.get("", getAllEnrollCourse)
router.get("/:id", getAEnrollCourse)
// router.patch("/:id", updateAEnrollCourse)
// router.delete("/:id", deleteAEnrollCourse)

export const EnrolledCourseRoutes = router
