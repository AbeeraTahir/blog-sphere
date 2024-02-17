"use client";

import React from "react";
import { useAppSelector } from "@/lib/redux/store";
import { ActionsProps } from "@/lib/utils";

const CommentActions = ({ authorId }: ActionsProps) => {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <>
      {user?._id === authorId && (
        <div className="mb-1 ml-11 text-[0.75rem] sm:text-[0.85rem] text-muted-foreground underline flex items-center gap- sm:gap-3">
          <p>Edit</p>
          <div className="h-3 border border-gray-300" />
          <p>Delete</p>
        </div>
      )}
    </>
  );
};

export default CommentActions;
