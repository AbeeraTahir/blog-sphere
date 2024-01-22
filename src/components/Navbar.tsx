"use client";

import React from "react";
import Link from "next/link";
import { logout } from "@/src/lib/redux/features/authSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/src/components/ui/use-toast";
import { Button } from "./ui/button";

const navLinks = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "All Posts",
    link: "/posts",
  },
];

const Navbar = ({ token }: any) => {
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      const res = await axios.get("/api/auth/logout");
      console.log(res);
      router.push("/login");
      toast({
        description: res.data.message,
      });
    } catch (error: any) {
      console.log(error);
      toast({
        description: error.response.data.error,
      });
    }
  };

  console.log(token);

  return (
    <nav className="flex justify-between px-20 py-6 items-center shadow-sm">
      <div className="text-[1.5rem] font-bold">BlogSphere</div>
      <div className="flex items-center gap-8 h-8">
        {navLinks.map((link) => (
          <Link href={link.link} key={link.title}>
            {link.title}
          </Link>
        ))}
        <div className="border h-full" />
        {token ? (
          <button onClick={handleLogout}>{token.full_name}</button>
        ) : (
          <div className="flex gap-5 items-center">
            <Link href="/login">
              <Button variant={"outline"} className="w-20">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="w-20">Signup</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
