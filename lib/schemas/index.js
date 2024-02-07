import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .trim()
    .min(2, { message: "Username must have at least 2 characters" }),
  password: z.string().trim(),
  avatar: z.any().optional(),
});
export const loginSchema = z.object({
  username: z.string().trim().min(1, { message: "Username is missed" }),
  password: z.string().trim().min(1, { message: "Password is missed" }),
});
