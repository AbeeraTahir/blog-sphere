import React, { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "./PostCard";
import { PostCardProps } from "@/lib/utils";

const PostsList = () => {
  const [posts, setPosts] = useState<PostCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("/api/posts");
        console.log(res.data.posts);
        setPosts(res.data.posts);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    void getPosts();
  }, []);
  return (
    <div className="grid gap-5 grid-responsive">
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
