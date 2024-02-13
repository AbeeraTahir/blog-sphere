import React from "react";
import { Button } from "@/components/ui/button";
import PostsList from "@/components/PostsList";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Wrapper from "@/components/Wrapper";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <Wrapper>
      <Hero />
      <h2 className="font-[600] text-center lg:text-start text-3xl sm:text-4xl mb-10">
        Latest Blog Posts:
      </h2>
      <PostsList simplified />
      <div className="mx-auto my-12">
        <Link href="/posts">
          <Button className="flex gap-2 items-center">
            <span>View All Posts</span>
            <span>
              <ChevronRight size={20} strokeWidth={2} />
            </span>
          </Button>
        </Link>
      </div>
    </Wrapper>
  );
}
