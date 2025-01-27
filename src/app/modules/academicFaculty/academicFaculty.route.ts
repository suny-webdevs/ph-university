import { Router } from "express"
import { AcademicFacultyControllers } from "./academicFaculty.controller"
import validateRequest from "../../middlewares/validateRequest"
import { AcademicFacultySchemaValidations } from "./academicFaculty.validation"
import auth from "../../middlewares/auth"
import { USER_ROLE } from "../user/user.constant"

const router = Router()
// POST
router.post(
  "/create-academic-faculty",
  auth("superAdmin", "admin"),
  validateRequest(
    AcademicFacultySchemaValidations.createAcademicFacultyValidationSchema
  ),
  AcademicFacultyControllers.createAcademicFaculty
)
// GET
router.get("", AcademicFacultyControllers.getAllAcademicFaculty)
// GET
router.get("/:id", AcademicFacultyControllers.getAcademicFaculty)
// PATCH
router.patch(
  "/:id",
  validateRequest(
    AcademicFacultySchemaValidations.updateAcademicFacultyValidationSchema
  ),
  AcademicFacultyControllers.updateAcademicFaculty
)

export const AcademicFacultyRoutes = router
