"use client";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-screen-xl">
      <div className="h-screen flex justify-center items-center text-center flex-col gap-6 px-5 md:px-20 pt-20 sm:pt-0">
        <h1 className="font-extrabold text-3xl sm:text-5xl">
          Connect Through Stories
        </h1>
        <h2 className="text-lg sm:text-xl text-muted-foreground">
          Engage with narratives that inspire, resonate, and spark conversation.
          Join a community where stories fuel dialogue and inspiration ignites
          connection
        </h2>
        <div className="flex sm:flex-row flex-col items-center gap-4 mt-3">
          <Button variant={"outline"} className="w-36">
            Read Stories
          </Button>
          <Button className="w-36">Start Writing</Button>
        </div>
      </div>
    </div>
  );
}
