import { z } from "zod"

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Academic department name must be in string",
      required_error: "Academic department name is required",
    }),
    academicFaculty: z.string({
      invalid_type_error: "Academic department name must be in string",
      required_error: "Academic department name is required",
    }),
  }),
})

const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    academicFaculty: z.string().optional(),
  }),
})

export const AcademicDepartmentSchemaValidations = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
}
