import { z } from "zod";

export const VEHICLE_STATUS = [
  'AVAILABLE',
  'UNAVAILABLE',
  'RENTED',
  'DAMAGED',
  'UNDER_MAINTENANCE'
] as const;

export const TRANSMISSION_TYPES = [
  'MANUAL',
  'AUTOMATIC'
] as const;


export const createVehicleSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  category_id: z.string().min(1, "Category is required"),
  status: z.enum(VEHICLE_STATUS).default('AVAILABLE').optional(),
  transmission: z.enum(TRANSMISSION_TYPES).optional(),
  plate_number: z.string().min(1, "Plate number is required"),
  fuel_type: z.string().min(1, "Fuel type is required"),
  color: z.string().min(1, "Color is required"),
  rate_per_day: z.number().min(0, "Daily rate must be positive"),
  rate_per_hour: z.number().min(0, "Hourly rate must be positive"),
  capacity: z.number().min(1, "Capacity must be at least 1"),
  mileage: z.number().min(0, "Mileage cannot be negative"),
  model: z.string().min(1, "Model is required"),
  brand: z.string().min(1, "Brand is required"),
  type: z.string().min(1, "Vehicle type is required"),
  year: z.number()
    .min(1900, "Year must be after 1900")
    .max(new Date().getFullYear() + 1, "Year cannot be in the future"),
});

export const updateVehicleSchema = createVehicleSchema.partial().extend({
  id: z.string().min(1, "ID is required")
});

export type CreateVehicleSchema = z.infer<typeof createVehicleSchema>;
export type UpdateVehicleSchema = z.infer<typeof updateVehicleSchema>;