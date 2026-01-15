"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <div className="flex items-center justify-center gap-2 py-6 cursor-pointer">
      {/* Prev */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="rounded-xl border px-4 text-gray-700  py-2 text-sm disabled:opacity-40"
      >
        ← Prev
      </button>

      {/* Pages (Desktop) */}
      <div className="hidden md:flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`rounded-xl  cursor-pointer px-4 py-2 text-sm border transition
              ${
                currentPage === page
                  ? "bg-[#1E2939]  text-white"
                  : `${
                      resolvedTheme == "dark" ? "dark:bg-gray-800" : ""
                    } hover:bg-gray-400 text-black`
              }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Mobile */}
      <span className="md:hidden text-sm font-medium">
        Page {currentPage} / {totalPages}
      </span>

      {/* Next */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="cursor-pointer  rounded-xl border px-4 py-2 text-sm disabled:opacity-40"
      >
        Next →
      </button>
    </div>
  );
}
