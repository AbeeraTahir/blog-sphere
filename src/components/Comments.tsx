"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";

interface CommentTypes {
  _id: string;
  post: string;
  author: string;
  content: string;
}

interface CommentsProps {
  postId: string;
}

const Comments = ({ postId }: CommentsProps) => {
  const [commentsCount, setCommentsCount] = useState<number>(0);
  const [comments, setComments] = useState<CommentTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:3000/api/posts/${postId}/comments`
        );
        setComments(res.data.comments);
        setCommentsCount(res.data.comments.length);
        console.log(res.data.comments);
      } catch (error: any) {
        throw new Error("Something went wrong", error.response.data.error);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [postId]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-[600] text-xl md:text-2xl">
        Comments ({commentsCount})
      </h2>
    </div>
  );
};

export default Comments;
