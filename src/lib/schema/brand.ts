import { z } from "zod";

export const createBrandSchema = z.object({
    brand_name: z.coerce.string().min(1, "Name is required"),
    description: z.coerce.string().optional(),
});

export const updateBrandSchema = createBrandSchema.partial();

export type CreateBrandSchema = z.infer<typeof createBrandSchema>;
export type UpdateBrandSchema = z.infer<typeof updateBrandSchema>;