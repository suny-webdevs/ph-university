import { z } from "zod"

export const createEnrollCourseValidationSchema = z.object({
  body: z.object({
    offeredCourse: z.string({ required_error: "Offered course is required" }),
  }),
})
