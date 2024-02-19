"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Newspaper, SquarePen } from "lucide-react";
import { useAppSelector } from "@/lib/redux/store";

const Hero = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="h-screen flex justify-center items-center text-center flex-col gap-6 mt-[-7rem] sm:mt-[-7rem] px-2">
      <h1 className="font-extrabold text-3xl sm:text-5xl">
        Explore and Create Stories on BlogSphere
      </h1>
      <h2 className="text-lg sm:text-xl text-muted-foreground">
        Immerse Yourself in a Diverse Community of Writers and Readers, and
        Unleash Your Creative Potential. Embark on a Journey of Discovery and
        Inspiration.
      </h2>
      <div className="flex md:flex-row flex-col gap-3 items-center">
        <Link href="/posts">
          <Button variant="outline" className="w-36 flex gap-2">
            <span>
              <Newspaper size={18} strokeWidth={1.25} />
            </span>
            <span>Explore Stories</span>
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
