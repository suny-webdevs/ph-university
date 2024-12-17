import { z } from "zod"

const nameValidationSchema = z.object({
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
})

const createAdminValidationSchema = z.object({
  body: z.object({
    admin: z.object({
      name: nameValidationSchema,
      email: z
        .string({ required_error: "Email is required" })
        .email("Invalid email address"),
      phone: z
        .string({ required_error: "Phone is required" })
        .regex(/^\+?[0-9]\d{10,15}$/, "Phone must be a valid number"),
      image: z.string().url("Image must be a valid URL").optional(),
      gender: z.enum(["male", "female", "others"], {
        invalid_type_error: "Gender must be male, female, or others",
        required_error: "Gender is required",
      }),
      dateOfBirth: z.string({ required_error: "Date of birth is required" }),
      emergencyPhone: z
        .string({ required_error: "Emergency contact is required" })
        .regex(/^\+?[0-9]\d{10,15}$/, "Emergency phone must be a valid number"),
      bloodGroup: z.enum(["A+", "A-", "AB+", "AB-", "O+", "O-"], {
        invalid_type_error: "Invalid blood group",
        required_error: "Blood group is required",
      }),
      permanentAddress: z.string({
        required_error: "Permanent address is required",
      }),
      presentAddress: z.string({
        required_error: "Present address is required",
      }),
      academicDepartment: z.string({
        required_error: "Academic department is required",
      }),
    }),
  }),
})

export const AdminValidationSchemas = {
  createAdminValidationSchema,
}
