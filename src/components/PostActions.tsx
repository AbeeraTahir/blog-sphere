"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useAppSelector } from "@/lib/redux/store";
import { ActionsProps } from "@/lib/utils";

const PostActions = ({ postId, authorId }: ActionsProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();
  const { toast } = useToast();

  const deletePost = async () => {
    try {
      setIsLoading(true);
      const res = await axios.delete(`/api/posts/${postId}`);
      router.push(`/${authorId}`);
      toast({
        description: res.data.message,
      });
    } catch (error: any) {
      toast({
        description: error.response.data.error || "Something went wrong!",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {user?._id === authorId && (
        <div className="flex gap-3">
          <Link href={`/posts/${postId}/editPost`}>
            <Button variant={"secondary"}>Edit</Button>
          </Link>
          <Button variant={"secondary"} onClick={deletePost}>
            {isLoading ? (
              <ReloadIcon className="h-4 w-4 animate-spin" />
            ) : (
              "Delete"
            )}
          </Button>
        </div>
      )}
    </>
  );
};

export default PostActions;
