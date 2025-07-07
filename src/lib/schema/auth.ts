import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(1, { message: "Please enter your name" }),
    email: z
      .string()
      .min(1, { message: "Please enter your email" })
      .email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(7, { message: "Password must be at least 7 characters long" }),
    password_confirmation: z.string().min(7, {
      message: "Password confirmation must be at least 7 characters",
    }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });
export type RegisterSchema = z.infer<typeof registerSchema>;
