import { Router } from "express"
import { FacultyControllers } from "./faculty.controller"

const router = Router()

router.get("", FacultyControllers.getAllFaculties)
router.get("/:id", FacultyControllers.getFaculty)
router.patch("/:id", FacultyControllers.updateFaculty)
router.delete("/:id", FacultyControllers.deleteFaculty)

export const FacultyRoutes = router
