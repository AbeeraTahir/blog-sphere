"use client";

import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  TSignupValidator,
  SignupValidator,
} from "@/lib/validators/authValidator";
import Link from "next/link";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TSignupValidator>({
    resolver: zodResolver(SignupValidator),
  });

  const router = useRouter();

  const onSubmit = async ({ full_name, email, password }: TSignupValidator) => {
    try {
      const res = await axios.post("/api/signup", {
        full_name,
        email,
        password,
      });
      router.push("/login");
      console.log(res);
      toast.success(res.data.message);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    reset();
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-center mb-1">Create an account</CardTitle>
        <CardDescription className="text-center mb-2">
          Or already have an account?{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="full_name" className="ml-1">
              Full Name:
            </Label>
            <Input
              {...register("full_name")}
              className={errors?.full_name ? "focus-visible:ring-red-500" : ""}
              placeholder="You full name"
            />
            {errors?.full_name && (
              <p className="text-sm text-red-500">{errors.full_name.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="ml-1">
              Email:
            </Label>
            <Input
              {...register("email")}
              className={errors?.email ? "focus-visible:ring-red-500" : ""}
              placeholder="you@example.com"
            />
            {errors?.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password" className="ml-1">
              Password:
            </Label>
            <Input
              {...register("password")}
              className={errors?.password ? "focus-visible:ring-red-500" : ""}
              placeholder="Password"
            />
            {errors?.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Sign up</Button>
        </CardFooter>
      </form>
    </>
  );
};

export default Signup;
