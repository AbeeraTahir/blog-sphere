"use client";

import React, { useState } from "react";
import PostsList from "@/components/PostsList";
import { Separator } from "@/components/ui/separator";

const categoryData = [
  {
    name: "All",
    link: "",
  },
  {
    name: "Technology",
    link: "technology",
  },
  {
    name: "Lifestyle",
    link: "lifestyle",
  },
  {
    name: "Business",
    link: "business",
  },
  {
    name: "Education",
    link: "education",
  },
  {
    name: "Science",
    link: "science",
  },
  {
    name: "Creativity",
    link: "creativity",
  },
];

const Posts = () => {
  const [category, setCategory] = useState("");
  return (
    <div className="px-5 md:px-32 flex flex-col gap-10 pt-36 pb-20">
      <h2 className="text-center font-[600] text-3xl sm:text-4xl">All Posts</h2>
      <h3 className="font-[600] text-xl sm:text-2xl">Choose a category:</h3>
      <div className="flex flex-col gap-5 items-center">
        <div className="w-full flex justify-between items-center">
          {categoryData.map(({ name, link }) => (
            <div
              key={name}
              className={`p-1 cursor-pointer ${
                category === link ? "font-bold border-black border-b" : ""
              }`}
              onClick={() => setCategory(link)}>
              {name}
            </div>
          ))}
        </div>
        <Separator />
      </div>
      <PostsList category={category} />
    </div>
  );
};

export default Posts;
