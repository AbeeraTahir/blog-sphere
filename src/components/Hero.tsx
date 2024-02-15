"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Newspaper, SquarePen } from "lucide-react";
import { useAppSelector } from "@/lib/redux/store";
import { useDispatch } from "react-redux";
import { getUserData } from "@/lib/redux/features/authSlice";
import { AnyAction } from "@reduxjs/toolkit";

const Hero = () => {
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    const getLoggedInUser = async () => {
      try {
        await dispatch(getUserData() as unknown as AnyAction);
      } catch (error) {
        throw new Error("Error fetching user");
      }
    };
    void getLoggedInUser();
  }, [dispatch]);
  return (
    <div className="h-screen flex justify-center items-center text-center flex-col gap-6 mt-[-7rem] sm:mt-[-7rem] px-2">
      <h1 className="font-extrabold text-3xl sm:text-5xl">
        Connect Through Stories
      </h1>
      <h2 className="text-lg sm:text-xl text-muted-foreground">
        Engage with narratives that inspire, resonate, and spark conversation.
        Join a community where stories fuel dialogue and inspiration ignites
        connection
      </h2>
      <div className="flex md:flex-row flex-col gap-3 items-center">
        <Link href="/posts">
          <Button variant="outline" className="w-36 flex gap-2">
            <span>
              <Newspaper size={18} strokeWidth={1.25} />
            </span>
            <span>Read Stories</span>
          </Button>
        </Link>
        <Link href={user ? "/posts/createPost" : "/login"}>
          <Button className="w-36 flex gap-2">
            <span>
              <SquarePen size={18} strokeWidth={1.25} />
            </span>
            <span>Start Writing</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
