import { Router } from "express"
import { AcademicSemesterControllers } from "./academicSemester.controller"
import validateRequest from "../../middlewares/validateRequest"
import { AcademicSemesterValidations } from "./academicSemester.validation"

const router = Router()

router.post(
  "/create-academic-semester",
  validateRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema
  ),
  AcademicSemesterControllers.createAcademicSemester
)
router.get("", AcademicSemesterControllers.getAcademicSemesters)
router.get("/:id", AcademicSemesterControllers.getAcademicSemester)
router.patch(
  "/:id",
  validateRequest(
    AcademicSemesterValidations.updateAcademicSemesterValidationSchema
  ),
  AcademicSemesterControllers.updateAcademicSemester
)

export const AcademicSemesterRoutes = router
