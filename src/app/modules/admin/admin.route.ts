import { Router } from "express"
import { AdminControllers } from "./admin.controller"

const router = Router()

router.get("", AdminControllers.getAllAdmins)
router.get("/:id", AdminControllers.getAdmin)
router.patch("/:id", AdminControllers.updateAdmin)
router.delete("/:id", AdminControllers.deleteAdmin)

export const AdminRoutes = router
