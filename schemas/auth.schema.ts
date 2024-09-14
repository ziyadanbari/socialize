import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email("You need to enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

const signUpFirstStepSchema = z.object({
  email: z.string().email("You need to enter a valid email"),
  password: z.string().min(1, "Password is required"),
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
});

const signUpSecondStepSchema = signUpFirstStepSchema.extend({
  username: z.string().min(1, "Username is required"),
  profilePic: z.any().optional(),
});

export { signInSchema, signUpFirstStepSchema, signUpSecondStepSchema };
