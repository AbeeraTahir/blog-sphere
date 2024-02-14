"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Wrapper from "./Wrapper";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { PostCardProps } from "@/lib/utils";

interface PostFormProps {
  edittablePost?: PostCardProps;
}

const PostForm = ({ edittablePost }: PostFormProps) => {
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
      if (edittablePost) {
        setFormData(edittablePost);
      }
    };
    void getAuthorId();
  }, [edittablePost]);

  const handleChange = (e: any) => {
    const { name, files } = e.target;

    if (name === "image" && files && files[0]) {
      const selectedFile = files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        const base64Image = event.target?.result;
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
      let res;
      const post = { ...formData, author: authorId };
      if (edittablePost) {
        if (edittablePost.author !== authorId) {
          toast({
            description: "Invalid author",
          });
          setIsLoading(false);
          return;
        } else {
          res = await axios.put(`/api/posts/${edittablePost._id}`, post);
          router.push(`/posts/${edittablePost._id}`);
        }
      } else {
        res = await axios.post("/api/posts/newPost", post);
        setFormData({
          title: "",
          image: "",
          content: "",
        });
        router.push(`/${authorId}`);
      }
      toast({
        description: res?.data.message,
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
    <Wrapper>
      <form className="w-[90%] md:w-[75%] lg:w-[60%] mx-auto flex flex-col gap-8">
        <div className="flex flex-col items-start gap-2">
          <label htmlFor="title">Post Title:</label>
          <input
            type="text"
            name="title"
            placeholder="Enter Post Title"
            value={formData.title}
            onChange={handleChange}
            className="outline-none focus:none border py-2 px-3 rounded-md w-full"
          />
        </div>
        <div className="flex flex-col items-start gap-2">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-start gap-2 bordere">
              <label htmlFor="image">Post Image:</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                placeholder="Enter Post Image"
              />
            </div>
            {formData.image && (
              <Image
                src={formData.image}
                alt="post image"
                width={300}
                height={300}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col items-start gap-2">
          <label htmlFor="content">Post Content:</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Enter Post Content"
            className="outline-none border rounded-md py-2 px-3 w-full"
            rows={15}
          />
        </div>
        <Button onClick={handleSubmit}>
          {isLoading ? (
            <ReloadIcon className="h-4 w-4 animate-spin" />
          ) : (
            <>{edittablePost ? "Edit Post" : "Create Post"}</>
          )}
        </Button>
      </form>
    </Wrapper>
  );
};

export default PostForm;
