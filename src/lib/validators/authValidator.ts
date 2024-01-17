import { z } from "zod";

export const SignupValidator = z.object({
  full_name: z
    .string()
    .min(2, { message: "Name should of mimimum 2 characters" })
    .max(20, { message: "Name should of maximum 20 characters" }),
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
