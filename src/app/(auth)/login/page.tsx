"use client";

import React from "react";
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
  TLoginValidator,
  LoginValidator,
} from "@/lib/validators/authValidator";
import Link from "next/link";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TLoginValidator>({
    resolver: zodResolver(LoginValidator),
  });

  const onSubmit = ({ email, password }: TLoginValidator) => {
    console.log({ email, password });
    reset();
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-center mb-1">Login</CardTitle>
        <CardDescription className="text-center mb-2">
          Or do not have an account?{" "}
          <Link href="/signup" className="underline">
            Signup
          </Link>
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="flex flex-col gap-5">
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
          <Button className="w-full">Login</Button>
        </CardFooter>
      </form>
    </>
  );
};

export default Login;
