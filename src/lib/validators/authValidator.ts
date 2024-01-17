import { z } from "zod";

export const AuthValidator = z.object({
  full_name: z.string(),
  email: z.string().email({ message: "Please enter valid email address" }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
});

export type TAuthValidator = z.infer<typeof AuthValidator>;
