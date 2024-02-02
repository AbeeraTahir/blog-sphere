"use client";

import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import { PostCardProps } from "@/lib/utils";
import axios from "axios";

interface PostsListProps {
  simplified?: boolean;
  author?: string;
}

const PostsList = ({ simplified, author }: PostsListProps) => {
  // const posts = await getPosts();
  // let displayedPosts = [];
  // if (author) {
  //   displayedPosts = posts?.posts?.filter(
  //     (post: { author: string }) => post.author === author
  //   );
  // } else {
  //   displayedPosts = posts?.posts || [];
  // }
  const [posts, setPosts] = useState<PostCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("/api/posts");
        console.log(res.data.posts);
        setPosts(res.data.posts);
        if (author) {
          setPosts(
            res.data.posts.filter(
              (post: { author: string }) => post.author === author
            )
          );
        } else {
          setPosts(res.data.posts);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    void getPosts();
  }, [author]);
  return (
    <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center md:place-items-start">
      {isLoading
        ? "loading"
        : posts?.map((post) => (
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
