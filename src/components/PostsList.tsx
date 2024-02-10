import React from "react";
import PostCard from "./PostCard";
import { PostCardProps } from "@/lib/utils";

interface PostsListProps {
  simplified?: boolean;
  author?: string;
}

const getPosts = async () => {
  const res = await fetch("http://localhost:3000/api/posts", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json();
};

const PostsList = async ({ simplified, author }: PostsListProps) => {
  const posts = await getPosts();
  let displayedPosts = [];
  if (author) {
    displayedPosts = posts?.posts?.filter(
      (post: { author: string }) => post.author === author
    );
  } else if (simplified) {
    displayedPosts = posts?.posts?.slice(0, 6);
  } else {
    displayedPosts = posts?.posts || [];
  }

  return (
    <div className="flex flex-wrap gap-4 md:gap-2 lg:gap-5 justify-center lg:justify-start">
      {displayedPosts.map((post: PostCardProps) => (
        <PostCard
          key={post._id}
          _id={post._id}
          title={post.title}
          content={post.content}
          image={post.image}
          author={post.author}
          category={post.category}
        />
      ))}
    </div>
  );
};

export default PostsList;
