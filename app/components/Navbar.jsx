"use client";
import { useTheme } from "next-themes";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

//toggle theme
import ThemeToggle from "./ThemeToggle";

import { useApp } from "@/app/providers/AppContext";

// Images
import HamburgerMenuLight from "@/public/HamburgerMenuLight.svg";
import HamburgerMenuDark from "@/public/HamburgerMenuDark.svg";
import RocketLogoLight from "@/public/RocketLogoLight.svg";
import RocketLogoDark from "@/public/RocketLogoDark.svg";
import CartDark from "@/public/CartDark.svg";
import CartLight from "@/public/CartLight.svg";

export default function Navbar() {
  // next theme
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // ScrollY
  const [showNav, setShowNav] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show navbar at top
      if (currentScrollY <= 50) {
        setShowNav(true);
      }
      // Scrolling up → show navbar
      else if (currentScrollY < lastScrollY.current) {
        setShowNav(true);
      }
      // Scrolling down → hide navbar
      else {
        setShowNav(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { cartItems } = useApp();

  // next theme mounted
  if (!mounted) return null;
  return (
    <nav
      className={`px-5  fixed z-10 backdrop-blur-md h-14 md:h-18 top-0 left-0 w-full   transition-transform duration-300 ease-in-out

        ${
          showNav ? "translate-y-0" : "-translate-y-full bg-blur-xs"
        } shadow-md`}
    >
      <div className="flex justify-between md:px-20 py-1.5">
        {/* Logo */}
        <Image
          src={resolvedTheme === "dark" ? RocketLogoDark : RocketLogoLight}
          alt="Logo"
          className="cursor-pointer w-12 h-12 md:w-16 md:h-16"
          unoptimized
        />

        {/* Actions */}
        <div className="flex items-center gap-3 md:gap-4">
          <ThemeToggle />
          <div
            className={`
    relative flex items-center justify-center
    w-12 h-12 md:w-14 md:h-14
    rounded-full
    cursor-pointer
    transition transform hover:scale-105
    ${
      resolvedTheme === "dark"
        ? "bg-white/10 hover:bg-white/20"
        : "bg-gray-200 hover:bg-gray-200"
    }
  `}
          >
            <Image
              src={resolvedTheme === "dark" ? CartLight : CartDark}
              alt="cart"
              className="w-6 h-6 md:w-7 md:h-7"
              unoptimized
            />

            {/* BADGE */}
            {cartItems.length > 0 && (
              <span
                className="
        absolute -top-1 -right-1
        min-w-[20px] h-5
        px-1
        flex items-center justify-center
        rounded-full
        bg-amber-400 text-black
        text-xs font-bold
        shadow-md
      "
              >
                {cartItems.length}
              </span>
            )}
          </div>

          <Image
          unoptimized
            src={
              resolvedTheme === "dark" ? HamburgerMenuLight : HamburgerMenuDark
            }
            alt="menu"
            className="cursor-pointer w-10 h-10 md:w-12 md:h-12"
          />
        </div>
      </div>
    </nav>
  );
}
