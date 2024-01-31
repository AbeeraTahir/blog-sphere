"use client";

import React, { useState, useEffect } from "react";
import PostForm from "@/components/PostForm";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { Params } from "@/lib/utils";

const EditPost = ({ params }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    content: "",
  });

  const { toast } = useToast();

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(`/api/posts/${params.id}`);
        setFormData(res.data.post);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    void getPost();
  }, [params.id]);

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
      const res = await axios.put(`/api/posts/${params.id}`, formData);
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
      editPost
      isLoading={isLoading}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default EditPost;
