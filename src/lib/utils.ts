import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface PostCardProps {
  _id: string;
  title: string;
  content: string;
  image: string;
  author: string;
  category: string;
}

export interface Params {
  postId: string;
  commentId: string;
}
