"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";

interface UserData {
  _id: string;
  full_name: string;
  email: string;
}

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

const Navbar = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const getUserDetails = async () => {
      const res = await axios.get("/api/user");
      setUser(res.data.data);
    };
    void getUserDetails();
  }, []);

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

  return (
    <header className="w-full fixed top-0 z-20 bg-[#f8f8f8]">
      <nav className="flex justify-between px-20 py-6 items-center shadow-sm">
        <div className="text-[1.5rem] font-bold">BlogSphere</div>
        <div className="flex items-center gap-8 h-8">
          {navLinks.map((link) => (
            <Link href={link.link} key={link.title}>
              {link.title}
            </Link>
          ))}
          <div className="border h-full" />
          {user ? (
            <div className="flex gap-2 relative">
              <h2>{user.full_name}</h2>
              <ChevronDown
                size={18}
                strokeWidth={1.25}
                className={`mt-[0.3rem] cursor-pointer transition-transform transform duration-300 ease-in-out ${
                  isDropDownOpen ? "rotate-180" : ""
                }`}
                onClick={() => setIsDropDownOpen(!isDropDownOpen)}
              />
              {isDropDownOpen && (
                <div className="absolute top-7 w-32 p-4 bg-[#f8f8f8] rounded-md shadow-md flex flex-col gap-3">
                  <Link href={`/${user._id}`}>
                    <p>My posts</p>
                  </Link>
                  <p>Write post</p>
                  <p className="cursor-pointer" onClick={handleLogout}>
                    Logout
                  </p>
                </div>
              )}
            </div>
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
    </header>
  );
};

export default Navbar;
