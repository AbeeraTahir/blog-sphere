import { Button } from "@/components/ui/button";
import PostsList from "@/components/PostsList";
import Link from "next/link";
import { ChevronRight, Newspaper } from "lucide-react";
import Wrapper from "@/components/Wrapper";

export default function Home() {
  return (
    <Wrapper>
      <div className="h-screen flex justify-center items-center text-center flex-col gap-6 mt-[-7rem] sm:mt-[-7rem] px-2">
        <h1 className="font-extrabold text-3xl sm:text-5xl">
          Connect Through Stories
        </h1>
        <h2 className="text-lg sm:text-xl text-muted-foreground">
          Engage with narratives that inspire, resonate, and spark conversation.
          Join a community where stories fuel dialogue and inspiration ignites
          connection
        </h2>
        <Link href="/posts">
          <Button className="w-36 flex gap-2">
            <span>
              <Newspaper size={18} strokeWidth={1.25} />
            </span>
            <span>Read Stories</span>
          </Button>
        </Link>
      </div>
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
