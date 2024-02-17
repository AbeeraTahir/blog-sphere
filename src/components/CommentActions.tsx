"use client";

import React, { useState } from "react";
import { useAppSelector } from "@/lib/redux/store";
import { ActionsProps } from "@/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

interface CommentActionProps extends ActionsProps {
  comment: string;
}

const CommentActions = ({
  comment,
  authorId,
  postId,
  commentId,
}: CommentActionProps) => {
  const user = useAppSelector((state) => state.auth.user);
  const [editedComment, setEditedComment] = useState<string>(comment);
  const [isEditLoading, setIsEditLoading] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const editComment = async () => {
    try {
      setIsEditLoading(true);
      const res = await axios.put(
        `/api/posts/${postId}/comments/${commentId}`,
        { content: editedComment, author: authorId, post: postId }
      );
      router.refresh();
      toast({
        description: res.data.message,
      });
      setEditedComment("");
    } catch (error: any) {
      toast({
        description: error.response.data.error || "Something went wrong!",
      });
    } finally {
      setIsEditLoading(false);
    }
  };

  const deleteComment = async () => {
    try {
      setIsDeleteLoading(true);
      const res = await axios.delete(
        `/api/posts/${postId}/comments/${commentId}`
      );
      router.refresh();
      toast({
        description: res.data.message,
      });
    } catch (error: any) {
      toast({
        description: error.response.data.error || "Something went wrong!",
      });
    } finally {
      setIsDeleteLoading(false);
    }
  };

  return (
    <>
      {user?._id === authorId && (
        <div className="mb-1 ml-11 text-[0.75rem] sm:text-[0.85rem] text-muted-foreground underline flex items-center gap-2 sm:gap-3">
          <Dialog>
            <DialogTrigger>
              {isEditLoading ? (
                <ReloadIcon className="h-4 w-4 animate-spin" />
              ) : (
                "Edit"
              )}
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Comment</DialogTitle>
                <DialogDescription>
                  <input
                    type="text"
                    placeholder="Write Comment"
                    value={editedComment}
                    onChange={(e) => setEditedComment(e.target.value)}
                    className="mt-2 outline-none w-full border-b"
                  />
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose>
                  <Button type="submit" onClick={editComment}>
                    Save Changes
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <div className="h-3 border border-gray-300" />
          <p className="cursor-pointer" onClick={deleteComment}>
            {isDeleteLoading ? (
              <ReloadIcon className="h-4 w-4 animate-spin" />
            ) : (
              "Delete"
            )}
          </p>
        </div>
      )}
    </>
  );
};

export default CommentActions;
