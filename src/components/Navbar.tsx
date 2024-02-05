"use client";

import React, { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "./ui/button";
import {
  Menu,
  X,
  ChevronDown,
  Newspaper,
  SquarePen,
  LogOut,
  LucideIcon,
} from "lucide-react";
import NavItems from "./NavItems";

interface UserData {
  _id: string;
  full_name: string;
  email: string;
}

interface DropDownItemProps {
  icon: LucideIcon;
  link: string;
  label: string;
  onClick: () => void;
}

const DropdownItem = ({ icon, link, label, onClick }: DropDownItemProps) => {
  return (
    <Link href={link}>
      <div className="flex gap-3 items-center hover:bg-[#F0F0F0] p-2 rounded-sm">
        {icon && React.createElement(icon, { size: 18, strokeWidth: 1.25 })}
        <p onClick={onClick}>{label}</p>
      </div>
    </Link>
  );
};

const Navbar = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
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

  const toggleMenuBar = () => {
    setIsMobileMenuActive(!isMobileMenuActive);
  };

  const toggleDropDown = () => {
    console.log("dropdown");
    setIsDropDownOpen(!isDropDownOpen);
  };

  return (
    <header className="w-full fixed top-0 z-20 bg-[#f8f8f8]">
      {/* Overlay */}
      {isMobileMenuActive && (
        <div
          className="fixed top-[58px] left-0 w-full h-full bg-black opacity-50 z-10"
          onClick={() => setIsMobileMenuActive(false)}></div>
      )}
      <nav className="flex justify-between sm:px-20 sm:py-6 px-10 py-4 items-center shadow-sm">
        <div className="text-md sm:text-[1.5rem] font-bold">BlogSphere</div>
        <div className="block cursor-pointer md:hidden" onClick={toggleMenuBar}>
          {isMobileMenuActive ? <X /> : <Menu />}
        </div>
        <div
          className={`mobile-menu ${
            isMobileMenuActive ? "mobile-menu-show" : ""
          }`}>
          {isMobileMenuActive && (
            <div className="flex flex-col items-start justify-center gap-4">
              <NavItems onNavItemClick={toggleMenuBar} />
            </div>
          )}
        </div>
        <div className="md:flex items-center gap-8 h-8 hidden">
          <NavItems />
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
                onClick={toggleDropDown}
              />
              {isDropDownOpen && (
                <div className="absolute top-7 w-36 p-1 bg-[#f8f8f8] rounded-md shadow-md flex flex-col gap-1 text-sm">
                  <DropdownItem
                    icon={Newspaper}
                    link={`/${user._id}`}
                    label="My posts"
                    onClick={toggleDropDown}
                  />
                  <DropdownItem
                    icon={SquarePen}
                    link="/createPost"
                    label="Write post"
                    onClick={toggleDropDown}
                  />
                  <div className="flex gap-3 items-center hover:bg-[#F0F0F0] p-2 rounded-sm">
                    <LogOut size={18} strokeWidth={1.25} />
                    <p className="cursor-pointer" onClick={handleLogout}>
                      Logout
                    </p>
                  </div>
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
