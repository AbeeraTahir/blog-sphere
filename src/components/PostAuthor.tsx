import React from "react";
import { getUser } from "@/lib/helpers/getUserById";

interface PostAuthorProps {
  authorId: string;
}

const PostAuthor = async ({ authorId }: PostAuthorProps) => {
  const user = await getUser(authorId);
  return <>{user.full_name}</>;
};

export default PostAuthor;
