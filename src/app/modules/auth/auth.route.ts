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
router.post(
  "/forget-password",
  validateRequest(AuthValidationSchemas.forgetPasswordValidationSchema),
  AuthControllers.forgetPassword
)
router.post(
  "/reset-password",
  validateRequest(AuthValidationSchemas.resetPasswordValidationSchema),
  AuthControllers.resetPassword
)

export const AuthRoutes = router
