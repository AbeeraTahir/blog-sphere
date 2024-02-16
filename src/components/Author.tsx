import React from "react";
import { getUser } from "@/lib/helpers/getUserById";

interface AuthorProps {
  authorId: string;
  commentAuthor?: boolean;
}

const Author = async ({ authorId, commentAuthor }: AuthorProps) => {
  const user = await getUser(authorId);
  return (
    <>
      {commentAuthor ? (
        <h2 className="text-sm sm:text-[0.95rem] font-[600]">
          {user.full_name}
        </h2>
      ) : (
        <p className="text-sm sm:text-[0.95rem]">Author: {user.full_name}</p>
      )}
    </>
  );
};

export default Author;
