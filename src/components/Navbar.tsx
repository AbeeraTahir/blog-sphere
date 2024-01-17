"use client";

import React from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/lib/redux/features/authSlice";

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

const authLinks = [
  {
    title: "Login",
    link: "/login",
  },
  {
    title: "Signup",
    link: "/signup",
  },
];

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  console.log(user);

  const handleLogout = () => {
    // Dispatch the logout action to update Redux store
    dispatch(logout());
  };

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
        {user ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          authLinks.map((link) => (
            <Link href={link.link} key={link.title}>
              {link.title}
            </Link>
          ))
        )}
      </div>
    </nav>
  );
};

export default Navbar;
