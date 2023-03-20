import { z } from "zod";

export const signupSchema = z.object({
  username: z
    .string()
    .min(3, "Username has to be at least 3 characters")
    .max(75, "Username has to be at most 75 characters"),
  password: z
    .string()
    .min(4, "Password has to be at least 4 characters")
    .max(128, "Password has to be at most 128 characters"),
  passwordConfirm: z.string(),
});
