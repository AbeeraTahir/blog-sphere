"use client";

import React, { useState, useEffect } from "react";
import PostForm from "@/components/PostForm";
import axios from "axios";

const EditPost = ({ params }: any) => {
  const [post, setPost] = useState({
    _id: "",
    title: "",
    image: "",
    content: "",
  });

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(`/api/posts/${params.id}`);
        setPost(res.data.post);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    void getPost();
  }, [params.id]);

  return <PostForm edittablePost={post} />;
};

export default EditPost;
