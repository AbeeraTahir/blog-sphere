"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/redux/store";
import { useDispatch } from "react-redux";
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
import { AnyAction } from "@reduxjs/toolkit";
import { getUserData, logout } from "@/lib/redux/features/authSlice";
import { ClipLoader } from "react-spinners";

interface DropDownItemProps {
  icon?: LucideIcon;
  link: string;
  label: string;
  onClick: () => void;
}

const DropdownItem = ({ icon, link, label, onClick }: DropDownItemProps) => {
  return (
    <Link href={link}>
      <div className="flex gap-4 md:gap-3 items-center md:hover:bg-[#F0F0F0] md:hover:font-normal hover:font-[600] p-0 md:p-2 md:rounded-sm">
        {icon && React.createElement(icon, { size: 18, strokeWidth: 1.25 })}
        <p onClick={onClick}>{label}</p>
      </div>
    </Link>
  );
};

const Navbar = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
  const dispatch = useDispatch();
  const { loading, user } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const getLoggedInUser = async () => {
      try {
        await dispatch(getUserData() as unknown as AnyAction);
      } catch (error) {
        throw new Error("Error fetching user");
      }
    };
    void getLoggedInUser();
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      const res = await axios.get("/api/auth/logout");
      console.log(res);
      if (isMobileMenuActive) setIsMobileMenuActive(false);
      toast({
        description: res.data.message,
      });
      dispatch(logout());
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
    setIsDropDownOpen(!isDropDownOpen);
  };

  return (
    <header className="w-full fixed top-0 z-20 bg-[#f8f8f8]">
      {/* Overlay */}
      {isMobileMenuActive && (
        <div
          className="fixed top-[55px] left-0 w-full h-full bg-black opacity-50 z-10"
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
              {user ? (
                <>
                  <DropdownItem
                    link={`/${user._id}`}
                    label="My posts"
                    onClick={toggleMenuBar}
                  />
                  <DropdownItem
                    link="/posts/createPost"
                    label="Write post"
                    onClick={toggleMenuBar}
                  />
                  <p
                    className="cursor-pointer hover:font-[600]"
                    onClick={handleLogout}>
                    Logout
                  </p>
                </>
              ) : (
                <Link href="/login" className="hover:font-[600]">
                  Login
                </Link>
              )}
            </div>
          )}
        </div>
        <div className="md:flex items-center gap-8 h-8 hidden">
          <NavItems />
          <div className="border h-full" />
          {loading ? (
            <ClipLoader color="#000" />
          ) : (
            <>
              {user ? (
                <div className="flex gap-2 relative">
                  <h2>{user.full_name}</h2>
                  <ChevronDown
                    size={18}
                    strokeWidth={1.25}
                    className={`mt-[0.25rem] cursor-pointer transition-transform transform duration-300 ease-in-out ${
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
                        link="/posts/createPost"
                        label="Write post"
                        onClick={toggleDropDown}
                      />
                      <div
                        className="flex gap-3 items-center hover:bg-[#F0F0F0] p-2 rounded-sm cursor-pointer"
                        onClick={handleLogout}>
                        <LogOut size={18} strokeWidth={1.25} />
                        <p className="hover:font-[600] md:hover:font-normal">
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
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
