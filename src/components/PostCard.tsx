import React from "react";
import { Suspense } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { PostCardProps } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import PostAuthor from "./PostAuthor";

const PostCard = ({ _id, title, content, image, author }: PostCardProps) => {
  return (
    <>
      <div className="p-6 flex flex-col gap-6 rounded-md bg-white w-[340px] sm:w-[360px] border">
        <div className="flex flex-col gap-3">
          <h2 className="font-[600] text-lg sm:text-xl">{title}</h2>
          <Suspense fallback={<div>Loading...</div>}>
            <PostAuthor authorId={author} />{" "}
          </Suspense>
        </div>
        <div className="w-full h-[175px] relative overflow-hidden">
          <Image
            src={image}
            alt={title}
            layout="fill"
            sizes="(max-width: 360px) 100vw"
            objectFit="cover"
          />
        </div>
        <p className="text-[0.9rem]">
          {content.split(" ").length > 15
            ? content.split(" ").slice(0, 15).join(" ")
            : content}{" "}
          ...
        </p>
        <div className="ml-auto mt-auto">
          <Link href={`/posts/${_id}`}>
            <Button variant={"secondary"} className="flex gap-2 items-center">
              <span>Read Full Post</span>
              <span>
                <ChevronRight size={20} strokeWidth={2} />
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default PostCard;
