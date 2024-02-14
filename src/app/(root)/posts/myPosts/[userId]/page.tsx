import React from "react";
import Wrapper from "@/components/Wrapper";
import PostsList from "@/components/PostsList";

const MyPosts = ({ params }: any) => {
  return (
    <Wrapper>
      <h2 className="text-center font-[600] text-3xl sm:text-4xl mb-4">
        My Posts
      </h2>
      <PostsList author={params.userId} />
    </Wrapper>
  );
};

export default MyPosts;
