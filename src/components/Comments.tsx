import React, { Suspense } from "react";
import CommentForm from "./CommentForm";
import Author from "./Author";

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
    <div className="flex flex-col gap-4">
      <h2 className="font-[600] text-xl md:text-2xl">
        Comments ({comments?.length})
      </h2>
      <CommentForm postId={postId} />
      {comments?.map(({ _id, content, author, createdAt }: CommentTypes) => (
        <div key={_id} className="flex flex-col gap-1">
          <Suspense fallback={<div>Loading...</div>}>
            <Author commentAuthor authorId={author} />
          </Suspense>
          <p className="text-sm sm:text-[1rem]">{content}</p>
        </div>
      ))}
    </div>
  );
};

export default Comments;
