import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email("You need to enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export { signInSchema };
