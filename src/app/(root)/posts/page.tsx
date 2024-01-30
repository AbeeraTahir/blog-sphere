import React from "react";
import Wrapper from "@/components/Wrapper";
import PostsList from "@/components/PostsList";

const Posts = () => {
  return (
    <Wrapper>
      <h2 className="text-center font-[600] text-3xl sm:text-4xl mb-4">
        All Posts
      </h2>
      <PostsList />
    </Wrapper>
  );
};

export default Posts;
