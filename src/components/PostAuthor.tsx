import React from "react";
import { getUser } from "@/lib/helpers/getUserById";

interface PostAuthorProps {
  authorId: string;
}

const PostAuthor = async ({ authorId }: PostAuthorProps) => {
  const user = await getUser(authorId);
  return <p className="text-sm sm:text-[0.95rem]">Author: {user.full_name}</p>;
};

export default PostAuthor;
