import { z } from "zod";

export const createCarSchema = z.object({
  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),
  year: z.number().min(1900, "Invalid year"),
  price: z.number().min(0, "Price must be positive"),
  color: z.string().min(1, "Color is required"),
  type: z.string().min(1, "Type is required"),
  plateNumber: z.string().min(1, "Plate Number is required"),
  status: z.string().min(1, "Status is required"),
  description: z.string().optional(),
  images: z.any().optional(),  // Atau bisa refine lebih jauh nanti
});

export type CreateCarInput = z.infer<typeof createCarSchema>;
