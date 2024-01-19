"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Home() {
  const router = useRouter();

  const logoutHandler = async () => {
    try {
      const res = await axios.get("/api/users/logout");
      console.log(res);
      router.push("/login");
      toast.success(res.data.message);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <div>
      <h1>Hello World</h1>
      <button
        className="bg-zinc-400 px-2 py-1 rounded-md"
        onClick={logoutHandler}>
        Logout
      </button>
    </div>
  );
}
