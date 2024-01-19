"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";
import { useToast } from "@/src/components/ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

import {
  TLoginValidator,
  LoginValidator,
} from "@/src/lib/validators/authValidator";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { login } from "@/src/lib/redux/features/authSlice";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TLoginValidator>({
    resolver: zodResolver(LoginValidator),
  });

  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const onSubmit = async ({ email, password }: TLoginValidator) => {
    try {
      setIsLoading(true);
      const res = await axios.post("/api/auth/login", { email, password });
      router.push("/");
      console.log(res);
      dispatch(login(res.data));
      toast({
        description: res.data.message,
      });
    } catch (error: any) {
      console.log(error);
      toast({
        description: error.response.data.error,
      });
    } finally {
      setIsLoading(false);
    }
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
          <Button className="w-full">
            {isLoading ? (
              <ReloadIcon className="h-4 w-4 animate-spin" />
            ) : (
              "Login"
            )}
          </Button>
        </CardFooter>
      </form>
    </>
  );
};

export default Login;
