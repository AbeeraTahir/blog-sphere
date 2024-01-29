import React from "react";
import Image from "next/image";
import { Suspense } from "react";
import moment from "moment";
import PostAuthor from "@/components/PostAuthor";

const getPost = async (postId: string) => {
  const res = await fetch(
    `https://blog-sphere-one.vercel.app/api/posts/${postId}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json();
};

export const generateMetadata = async ({ params }: any) => {
  const post = await getPost(params.id);
  const { title, content } = post.post;
  return {
    title,
    content,
  };
};

const PostDetails = async ({ params }: any) => {
  const post = await getPost(params.id);
  const { title, image, content, author, createdAt } = post.post;
  return (
    <div className="mt-20 py-16">
      <div className="w-[60%] mx-auto flex flex-col gap-8">
        <h2 className="font-[600] text:xl md:text-3xl">{title}</h2>
        <div className="flex flex-col gap-2">
          <p>
            Author:{" "}
            {post && (
              <Suspense fallback={<div>Loading...</div>}>
                <PostAuthor authorId={author} />
              </Suspense>
            )}
          </p>
          <p>Created at: {moment(createdAt).format("MMMM DD, YYYY")}</p>
        </div>

        {image && (
          <div className="w-full h-[425px] relative">
            <Image src={image} alt={title} layout="fill" />
          </div>
        )}
        <p className="textt:sm md:text-lg">{content}</p>
      </div>
    </div>
  );
};

export default PostDetails;
