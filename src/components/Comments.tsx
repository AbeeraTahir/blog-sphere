"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { useAppSelector } from "@/lib/redux/store";
import { useDispatch } from "react-redux";
import { getUserData } from "@/lib/redux/features/authSlice";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import CommentForm from "./CommentForm";
import { AnyAction } from "@reduxjs/toolkit";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    const getLoggedInUser = async () => {
      try {
        await dispatch(getUserData() as unknown as AnyAction);
      } catch (error) {
        throw new Error("Error fetching user");
      }
    };
    void getLoggedInUser();
  }, [dispatch]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `http://localhost:3000/api/posts/${postId}/comments`
        );
        setComments(res.data.comments);
        setCommentsCount(res.data.comments.length);
        console.log(res.data.comments);
      } catch (error: any) {
        throw new Error("Something went wrong", error.response.data.error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchComments();
  }, [postId]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-[600] text-xl md:text-2xl">
        Comments ({commentsCount})
      </h2>
      <CommentForm user={user} postId={postId} />
    </div>
  );
};

export default Comments;
