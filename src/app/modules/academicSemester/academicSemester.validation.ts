import { z } from "zod"
import {
  AcademicSemesterCodes,
  AcademicSemesterNames,
  Months,
} from "./academicSemester.constant"

const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesterNames] as [string, ...string[]], {
      invalid_type_error: "Semester name should be autumn, summer or fall",
      required_error: "Semester name is required",
    }),
    code: z.enum([...AcademicSemesterCodes] as [string, ...string[]], {
      invalid_type_error: "Invalid semester code",
      required_error: "Semester code is required",
    }),
    year: z.string({
      invalid_type_error: "Invalid admission year",
      required_error: "Admission year is required",
    }),
    startMonth: z.enum([...Months] as [string, ...string[]], {
      invalid_type_error: "Invalid start month",
      required_error: "Start month is required",
    }),
    endMonth: z.enum([...Months] as [string, ...string[]], {
      invalid_type_error: "Invalid end month",
      required_error: "End month is required",
    }),
  }),
})

const updateAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z
      .enum([...AcademicSemesterNames] as [string, ...string[]], {
        invalid_type_error: "Semester name should be autumn, summer or fall",
        required_error: "Semester name is required",
      })
      .optional(),
    code: z
      .enum([...AcademicSemesterCodes] as [string, ...string[]], {
        invalid_type_error: "Invalid semester code",
        required_error: "Semester code is required",
      })
      .optional(),
    year: z
      .string({
        invalid_type_error: "Invalid admission year",
        required_error: "Admission year is required",
      })
      .optional(),
    startMonth: z
      .enum([...Months] as [string, ...string[]], {
        invalid_type_error: "Invalid start month",
        required_error: "Start month is required",
      })
      .optional(),
    endMonth: z
      .enum([...Months] as [string, ...string[]], {
        invalid_type_error: "Invalid end month",
        required_error: "End month is required",
      })
      .optional(),
  }),
})

export const AcademicSemesterValidations = {
  createAcademicSemesterValidationSchema,
  updateAcademicSemesterValidationSchema,
}
