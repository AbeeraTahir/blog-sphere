"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
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
import { LogIn, Undo2 } from "lucide-react";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TLoginValidator>({
    resolver: zodResolver(LoginValidator),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async ({ email, password }: TLoginValidator) => {
    try {
      setIsLoading(true);
      const res = await axios.post("/api/auth/login", { email, password });
      router.push("/");
      console.log(res);
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
              type="email"
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
              type="password"
              placeholder="Password"
            />
            {errors?.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/">
            <Button variant="outline" className="w-24 flex gap-3">
              <span>
                <Undo2 size={18} strokeWidth={2} />
              </span>
              <span>Home</span>
            </Button>
          </Link>
          <Button className="w-24 flex gap-3 items-center">
            <span>
              <LogIn size={18} strokeWidth={2} />
            </span>
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
