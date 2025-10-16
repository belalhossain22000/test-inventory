import { z } from "zod";

// Create Employee
 const createEmployeeValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  salary: z.number().positive("Salary must be positive"),
  image: z.string().url("Image must be a valid URL").optional(),
});

// Update Employee
 const updateEmployeeValidationSchema = z.object({
  name: z.string().min(1).optional(),
  salary: z.number().positive().optional(),
  image: z.string().url().optional(),
});



export const EmployeeValidation = {
  createEmployeeValidationSchema,
  updateEmployeeValidationSchema
};