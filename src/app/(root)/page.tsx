"use client";

import { Button } from "@/components/ui/button";
import PostsList from "@/components/PostsList";
import Link from "next/link";

export default function Home() {
  return (
    <div className="px-5 md:px-28 flex flex-col">
      <div className="h-screen flex justify-center items-center text-center flex-col gap-6 pt-20 sm:pt-10">
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
      <h2 className="font-[600] text-3xl sm:text-4xl mb-10">
        Latest Blog Posts:
      </h2>
      <PostsList simplified />
      <div className="border ml-auto my-12">
        <Link href="/posts">
          <Button>View All Posts</Button>
        </Link>
      </div>
    </div>
  );
}
