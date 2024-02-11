"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemsProps {
  onNavItemClick?: () => void;
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

const NavItems = ({ onNavItemClick }: NavItemsProps) => {
  const pathname = usePathname();
  return (
    <>
      {navLinks.map((link) => (
        <div key={link.title} onClick={onNavItemClick}>
          <Link
            href={link.link}
            className={`${
              !onNavItemClick ? (pathname === link.link ? "active" : "") : ""
            } on_hover`}>
            {link.title}
          </Link>
        </div>
      ))}
    </>
  );
};

export default NavItems;
