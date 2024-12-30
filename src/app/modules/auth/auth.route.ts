import { Router } from "express"
import validateRequest from "../../middlewares/validateRequest"
import { AuthValidationSchemas } from "./auth.validation"
import { AuthControllers } from "./auth.controller"
import auth from "../../middlewares/auth"

const router = Router()

router.post(
  "/login",
  validateRequest(AuthValidationSchemas.loginValidationSchema),
  AuthControllers.loginUser
)
router.post(
  "/change-password",
  auth("admin", "faculty", "student"),
  validateRequest(AuthValidationSchemas.changePasswordValidationSchema),
  AuthControllers.changePassword
)
router.post(
  "/refresh-token",
  validateRequest(AuthValidationSchemas.refreshTokenValidationSchema),
  AuthControllers.refreshToken
)

export const AuthRoutes = router
