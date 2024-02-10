"use client";

import React, { useState, useEffect } from "react";
import PostForm from "@/components/PostForm";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

const CreatePost = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authorId, setAuthorId] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    content: "",
  });

  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const getAuthorId = async () => {
      const res = await axios.get("/api/user");
      setAuthorId(res.data.data._id);
    };
    void getAuthorId();
  }, []);

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
      console.log({
        ...formData,
        author: authorId,
      });
      const res = await axios.post("/api/posts/newPosts", {
        ...formData,
        author: authorId,
      });
      setFormData({
        title: "",
        image: "",
        content: "",
      });
      router.push(`/${authorId}`);
      toast({
        description: res.data.message,
      });
    } catch (error: any) {
      console.log(error);
      toast({
        description: error.response.data.error || "Something went wrong!",
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
