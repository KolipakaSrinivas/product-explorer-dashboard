"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="px-4 py-2 rounded-lg  dark:border-white cursor-pointer border-2 "
    >
      {theme === "dark" ? (
        <span className="text-xl md:text-2xl">🌞</span>
      ) : (
        <span className="text-xl md:text-2xl">🌚</span>
      )}
    </button>
  );
}
