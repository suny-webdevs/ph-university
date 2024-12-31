import { z } from "zod"

// Name Schema
const nameValidationSchema = z.object({
  firstName: z.string({ required_error: "First name is required" }),
  middleName: z.string().optional(),
  lastName: z.string({ required_error: "Last name is required" }),
})

// Faculty Schema
export const createFacultyValidationSchema = z.object({
  body: z.object({
    password: z
      .string({
        invalid_type_error: "Password must be string",
      })
      .min(8, { message: "Password must be 8 characters" }),
    faculty: z.object({
      name: nameValidationSchema,
      email: z
        .string({ required_error: "Email is required" })
        .email("Invalid email address"),
      phone: z
        .string({ required_error: "Phone is required" })
        .regex(/^\+?[0-9]\d{10,15}$/, "Phone must be a valid number"),
      image: z.string().url("Image must be a valid URL").optional(),
      designation: z.string({
        required_error: "Designation is required",
        invalid_type_error: "Designation is must be a string",
      }),
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
