import { Router } from "express"
import { UserControllers } from "./user.controller"
import validateRequest from "../../middlewares/validateRequest"
import { StudentSchemaValidations } from "../student/student.validation"
import { UserSchemaValidations } from "./user.validation"
import { FacultyValidationSchema } from "../faculty/faculty.validation"
import { AdminValidationSchemas } from "../admin/admin.validation"
import auth from "../../middlewares/auth"

const router = Router()

router.post(
  "/create-student",
  auth("admin"),
  validateRequest(UserSchemaValidations.createUserValidationSchema),
  validateRequest(StudentSchemaValidations.createStudentValidationSchema),
  UserControllers.createUser
)
router.post(
  "/create-faculty",
  auth("admin"),
  validateRequest(UserSchemaValidations.createUserValidationSchema),
  validateRequest(FacultyValidationSchema.createFacultyValidationSchema),
  UserControllers.createFaculty
)
router.post(
  "/create-admin",
  auth("admin"),
  validateRequest(UserSchemaValidations.createUserValidationSchema),
  validateRequest(AdminValidationSchemas.createAdminValidationSchema),
  UserControllers.createAdmin
)
router.get("", UserControllers.getAllUser)

export const UserRoutes = router
