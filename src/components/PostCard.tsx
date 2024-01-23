import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { PostCardProps } from "@/lib/utils";

const PostCard = ({
  _id,
  title,
  content,
  image,
  author,
  category,
}: PostCardProps) => {
  return (
    <>
      <div className="p-6 flex flex-col gap-6 rounded-md bg-white border">
        <h2 className="font-[600] text-lg sm:text-xl">{title}</h2>
        <div className="h-[175px] overflow-hidden">
          <Image
            src={image}
            alt={title}
            width={500}
            height={175}
            objectFit="cover"
          />
        </div>
        <p className="text-[0.9rem]">
          {content.split(" ").slice(0, 15).join(" ")} ...
        </p>
        <div className="ml-auto mt-auto">
          <Link href={`/posts/${_id}`}>
            <Button>Read Full Post </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default PostCard;
