import React from "react";
import PostsList from "@/components/PostsList";

const MyPosts = ({ params }: any) => {
  return (
    <div className="px-2 md:px-6 lg:px-28 flex flex-col gap-10 pt-36 pb-20">
      <h2 className="text-center font-[600] text-3xl sm:text-4xl">My Posts</h2>
      <PostsList author={params.userId} />
    </div>
  );
};

export default MyPosts;
