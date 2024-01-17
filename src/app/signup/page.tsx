"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { TAuthValidator, AuthValidator } from "@/lib/validators/authValidator";
import Link from "next/link";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthValidator>({
    resolver: zodResolver(AuthValidator),
  });

  const onSubmit = ({ full_name, email, password }: TAuthValidator) => {
    console.log({ full_name, email, password });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-[400px]">
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
                className={
                  errors?.full_name ? "focus-visible:ring-red-500" : ""
                }
                placeholder="You full name"
              />
              {errors?.full_name && (
                <p className="text-sm text-red-500">
                  {errors.full_name.message}
                </p>
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
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Sign up</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Signup;
