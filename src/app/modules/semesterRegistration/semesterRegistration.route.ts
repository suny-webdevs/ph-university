import { Router } from "express"
import { SemesterRegistrationControllers } from "./semesterRegistration.controller"
import validateRequest from "../../middlewares/validateRequest"
import { SemesterRegistrationValidations } from "./semesterRegistration.validation"

const router = Router()

router.post(
  "/create-semester-registration",
  validateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema
  ),
  SemesterRegistrationControllers.createSemesterRegistration
)
router.get("", SemesterRegistrationControllers.getAllSemesterRegistration)
router.get("/:id", SemesterRegistrationControllers.getSemesterRegistration)
router.patch(
  "/:id",
  validateRequest(
    SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema
  ),
  SemesterRegistrationControllers.updateSemesterRegistration
)

export const SemesterRegistrationRoutes = router
