import { Router } from "express"
import { OfferedCourseControllers } from "./offeredCourse.controller"
import validateRequest from "../../middlewares/validateRequest"
import { OfferedCourseValidations } from "./offeredCourse.validation"

const router = Router()

router.post(
  "/create-offered-course",
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse
)
router.get("", OfferedCourseControllers.getAllOfferedCourses)
router.get("/:id", OfferedCourseControllers.getAOfferedCourse)
router.put("/:id", OfferedCourseControllers.updateOfferedCourse)
router.delete("/:id", OfferedCourseControllers.deleteOfferedCourse)

export const OfferedCourseRoutes = router
