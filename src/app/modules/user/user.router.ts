import { Router } from "express"
import { UserControllers } from "./user.controller"
import validateRequest from "../../middlewares/validateRequest"
import { createStudentValidationSchema } from "../student/student.validation"
import { createFacultyValidationSchema } from "../faculty/faculty.validation"
import { createAdminValidationSchema } from "../admin/admin.validation"
import auth from "../../middlewares/auth"
import { upload } from "../../utils/sendImageToCloudinary"
import textToJson from "../../middlewares/textToJson"

const router = Router()

router.post(
  "/create-student",
  auth("admin"),
  upload.single("file"),
  textToJson(),
  validateRequest(createStudentValidationSchema),
  UserControllers.createUser
)
router.post(
  "/create-faculty",
  auth("admin"),
  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty
)
router.post(
  "/create-admin",
  // auth("admin"),
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin
)

router.get("/me", auth("student", "faculty", "admin"), UserControllers.getMe)

export const UserRoutes = router
