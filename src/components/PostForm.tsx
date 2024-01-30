import React from "react";
import { Button } from "../components/ui/button";
import Wrapper from "./Wrapper";

interface FormDataProps {
  title: string;
  image: string;
  content: string;
}

interface PostFormProps {
  formData: FormDataProps;
  editPost?: boolean;
  handleChange: (e: any) => void;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const PostForm = ({
  formData,
  editPost,
  handleChange,
  handleSubmit,
}: PostFormProps) => {
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
          <label htmlFor="image">Post Image:</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            placeholder="Enter Post Image"
          />
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
          {editPost ? "Edit Post" : "Create Post"}
        </Button>
      </form>
    </Wrapper>
  );
};

export default PostForm;
