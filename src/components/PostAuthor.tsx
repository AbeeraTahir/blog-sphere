import React from "react";
import { getUser } from "@/lib/helpers/getUserById";

interface PostAuthorProps {
  authorId: string;
}

const PostAuthor = async ({ authorId }: PostAuthorProps) => {
  const user = await getUser(authorId);
  return <p className="text-sm sm:text-lg">Author: {user.full_name}</p>;
};

export default PostAuthor;
