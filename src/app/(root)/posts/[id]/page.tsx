import React from "react";
import Image from "next/image";
import { Suspense } from "react";
import moment from "moment";
import Author from "@/components/Author";
import Wrapper from "@/components/Wrapper";
import PostActions from "@/components/PostActions";
import Comments from "@/components/Comments";

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
  const { title, image, content, author, createdAt, updatedAt } = post.post;
  return (
    <Wrapper>
      <div className="w-[90%] md:w-[75%] lg:w-[60%] mx-auto flex flex-col gap-5 sm:gap-8">
        <h2 className="font-[600] text-xl md:text-3xl">{title}</h2>
        <div className="flex flex-col md:flex-row items-start gap-5 md:items-center justify-between">
          <div className="flex flex-col gap-2">
            {post && (
              <Suspense fallback={<div>Loading...</div>}>
                <Author authorId={author} />
              </Suspense>
            )}
            <p className="text-sm sm:text-[0.95rem]">
              {" "}
              {createdAt !== updatedAt
                ? `Updated at: ${moment(updatedAt).format("MMMM DD, YYYY")}`
                : `Created at: ${moment(createdAt).format("MMMM DD, YYYY")}`}
            </p>
          </div>
          <PostActions postId={params.id} authorId={author} />
        </div>

        {image && (
          <div className="w-full h-[280px] sm:h-[425px] relative">
            <Image src={image} alt={title} layout="fill" />
          </div>
        )}
        <p className="text-sm sm:text-[1rem] leading-6 sm:leading-7">
          {content}
        </p>
        <Comments postId={params.id} />
      </div>
    </Wrapper>
  );
};

export default PostDetails;
