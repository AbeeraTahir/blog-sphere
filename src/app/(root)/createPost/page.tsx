"use client";

import React, { useState } from "react";
import PostForm from "@/components/PostForm";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

const CreatePost = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    content: "",
  });

  const { toast } = useToast();

  const handleChange = (e: any) => {
    const { name, files } = e.target;

    if (name === "image" && files && files[0]) {
      const selectedFile = files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        const base64Image = event.target?.result;
        console.log(base64Image?.toString());
        setFormData((prevState) => ({
          ...prevState,
          [name]: base64Image?.toString(),
        }));
      };

      reader.readAsDataURL(selectedFile);
    } else {
      const { value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post("/api/posts/newPost", formData);
      setFormData({
        title: "",
        image: "",
        content: "",
      });
      toast({
        description: res.data.message,
      });
    } catch (error: any) {
      toast({
        description: error.response.data.error,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PostForm
      formData={formData}
      isLoading={isLoading}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default CreatePost;
