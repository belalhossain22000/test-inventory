import { z } from "zod";

// Create Product
 const createProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.number().positive("Price must be positive"),
  category: z.string().min(1, "Category is required"),
  image: z.string().url("Image must be a valid URL").optional(),
});

// Update Product
 const updateProductSchema = z.object({
  name: z.string().min(1).optional(),
  price: z.number().positive().optional(),
  category: z.string().min(1).optional(),
  image: z.string().url().optional(),
});



export const ProductValidation = {
  createProductSchema,
  updateProductSchema
};