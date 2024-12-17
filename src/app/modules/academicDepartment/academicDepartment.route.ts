import { Router } from "express"
import validateRequest from "../../middlewares/validateRequest"
import { AcademicDepartmentSchemaValidations } from "./academicDepartment.validation"
import { AcademicDepartmentControllers } from "./academicDepartment.controller"

const router = Router()

router.post(
  "/create-academic-department",
  validateRequest(
    AcademicDepartmentSchemaValidations.createAcademicDepartmentValidationSchema
  ),
  AcademicDepartmentControllers.createAcademicDepartment
)
router.get("", AcademicDepartmentControllers.getAllAcademicDepartments)
router.get("/:id", AcademicDepartmentControllers.getAcademicDepartment)
router.patch(
  "/:id",
  validateRequest(
    AcademicDepartmentSchemaValidations.updateAcademicDepartmentValidationSchema
  ),
  AcademicDepartmentControllers.updateAcademicDepartment
)

export const AcademicDepartmentRoutes = router
