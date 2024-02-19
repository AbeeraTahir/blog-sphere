import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface UserData {
  _id: string;
  full_name: string;
  email: string;
}

export interface data {
  data: UserData;
}

export interface PostCardProps {
  _id: string;
  title: string;
  content: string;
  image: string;
  author?: string;
}

export interface Params {
  postId?: string;
  commentId?: string;
}

export interface ActionsProps extends Params {
  authorId: string;
}
