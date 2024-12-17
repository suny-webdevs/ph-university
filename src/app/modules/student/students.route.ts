import { Router } from "express"
import { StudentControllers } from "./students.controller"

const router = Router()

router.get("", StudentControllers.getAllStudents)
router.get("/:id", StudentControllers.getStudent)
router.patch("/:id", StudentControllers.updateStudent)
router.delete("/:id", StudentControllers.deleteStudent)

export const StudentRoutes = router
