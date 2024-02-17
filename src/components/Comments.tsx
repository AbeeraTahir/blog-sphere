import React, { Suspense } from "react";
import CommentForm from "./CommentForm";
import Author from "./Author";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import moment from "moment";
import CommentActions from "./CommentActions";

interface CommentsProps {
  postId: string;
}

interface CommentTypes {
  _id: string;
  content: string;
  author: string;
  post: string;
  createdAt: string;
}

const getComments = async (postId: string) => {
  const res = await fetch(
    `http://localhost:3000/api/posts/${postId}/comments`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json();
};

const Comments = async ({ postId }: CommentsProps) => {
  const comments = await getComments(postId);
  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      <h2 className="font-[600] text-xl md:text-2xl">
        Comments ({comments?.length})
      </h2>
      <CommentForm postId={postId} />
      {comments?.map(({ _id, content, author, createdAt }: CommentTypes) => (
        <div key={_id} className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <div className="flex gap-4 items-center">
              <Avatar className="border w-7 h-7">
                <AvatarImage src="/user.png" />
                <AvatarFallback>I</AvatarFallback>
              </Avatar>
              <Suspense fallback={<div>Loading...</div>}>
                <Author commentAuthor authorId={author} />
              </Suspense>
            </div>
            <p className="text-[0.75rem] sm:text-sm text-muted-foreground">
              {moment(createdAt).format("MMMM DD, YYYY")}
            </p>
          </div>
          <p className="text-sm sm:text-[0.95rem] mb-1 ml-11">{content}</p>
          <CommentActions authorId={author} />
          <Separator />
        </div>
      ))}
    </div>
  );
};

export default Comments;
