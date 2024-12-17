import { z } from "zod"

const createUserValidationSchema = z.object({
  body: z.object({
    password: z
      .string({
        invalid_type_error: "Password must be string",
      })
      .min(8, { message: "Password must be 8 characters" }),
  }),
})

export const UserSchemaValidations = {
  createUserValidationSchema,
}
