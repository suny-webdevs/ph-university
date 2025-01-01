import { Router } from "express"
import {
  createEnrollCourse,
  deleteAEnrollCourse,
  getAEnrollCourse,
  getAllEnrollCourse,
  updateAEnrollCourse,
} from "./enrolledCourse.controller"

const router = Router()

router.post("/enroll-course", createEnrollCourse)
router.get("", getAllEnrollCourse)
router.get("/:id", getAEnrollCourse)
router.patch("/:id", updateAEnrollCourse)
router.delete("/:id", deleteAEnrollCourse)

export const EnrolledCourseRoutes = router
