"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useAppSelector } from "@/lib/redux/store";
import { useRouter } from "next/navigation";
import { Params } from "@/lib/utils";
import { ClipLoader } from "react-spinners";

const CommentForm = ({ postId }: Params) => {
  const router = useRouter();
  const { loading, user } = useAppSelector((state) => state.auth);
  const [comment, setComment] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (user) {
        const res = await axios.post(
          `/api/posts/${postId}/comments/newComment`,
          {
            content: comment,
            author: user._id,
            post: postId,
          }
        );
        console.log(res);
        toast({
          description: res.data.message,
        });
        router.refresh();
        setComment("");
      }
    } catch (error: any) {
      console.log(error);
      toast({
        description: error.response.data.error,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
        className="text-sm sm:text-[1rem] bg-transparent outline-none border-b-2 w-full px-1 py-2 mb-4"
      />
      <div className="flex flex-col gap-2 items-end">
        <Button className="w-20" disabled={user ? false : true}>
          {isLoading ? <ReloadIcon className="h-4 w-4 animate-spin" /> : "Post"}
        </Button>
        {loading ? (
          <ClipLoader color="#000" className="w-4 h-4" />
        ) : (
          <>
            {!user && (
              <p className="text-[0.75rem] sm:text-[0.95rem] italic">
                Please{" "}
                <Link href="/login" className="text-blue-500 underline">
                  Login{" "}
                </Link>
                to add a comment!
              </p>
            )}
          </>
        )}
      </div>
    </form>
  );
};

export default CommentForm;
