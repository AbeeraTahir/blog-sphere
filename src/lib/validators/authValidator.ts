import { z } from "zod";

export const SignupValidator = z.object({
  full_name: z.string(),
  email: z.string().email({ message: "Please enter valid email address" }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
});

export const LoginValidator = z.object({
  email: z.string().email({ message: "Please enter valid email address" }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
});

export type TSignupValidator = z.infer<typeof SignupValidator>;
export type TLoginValidator = z.infer<typeof LoginValidator>;
