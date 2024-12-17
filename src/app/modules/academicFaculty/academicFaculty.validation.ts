import { z } from "zod"

const createAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Password must be string",
      required_error: "Academic faculty name is required",
    }),
  }),
})
const updateAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Password must be string",
      required_error: "Academic faculty name is required",
    }),
  }),
})

export const AcademicFacultySchemaValidations = {
  createAcademicFacultyValidationSchema,
  updateAcademicFacultyValidationSchema,
}
