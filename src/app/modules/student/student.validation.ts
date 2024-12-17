import { z } from "zod"

// Name Schema
const nameValidationSchema = z.object({
  firstName: z.string({ required_error: "First name is required" }),
  middleName: z.string().optional(),
  lastName: z.string({ required_error: "Last name is required" }),
})

// Guardian Schema
const guardianValidationSchema = z.object({
  fatherName: z.string({ required_error: "Father name is required" }),
  fatherOccupation: z.string({
    required_error: "Father occupation is required",
  }),
  fatherPhone: z
    .string({ required_error: "Father phone is required" })
    .regex(/^\+?[0-9]\d{10,15}$/, "Father phone must be a valid number"),
  motherName: z.string({ required_error: "Mother name is required" }),
  motherOccupation: z.string({
    required_error: "Mother occupation is required",
  }),
  motherPhone: z
    .string({ required_error: "Mother phone is required" })
    .regex(/^\+?[0-9]\d{10,15}$/, "Mother phone must be a valid number"),
})

// Student Schema
const createStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
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
      guardian: guardianValidationSchema,
    }),
  }),
})

export const StudentSchemaValidations = {
  createStudentValidationSchema,
}
