import { z } from "zod";

export const createCategorySchema = z.object({
    name: z.coerce.string().min(1, "Name is required"),        
    description: z.coerce.string().optional(),
});

export type CreateCategorySchema = z.infer<typeof createCategorySchema>;