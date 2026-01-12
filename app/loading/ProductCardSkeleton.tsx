"use client";
import Skeleton from "react-loading-skeleton";
import { useTheme } from "next-themes";

export function ProductCardSkeleton() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const baseColor = isDark ? "#334155" : "#e5e7eb";
  const highlightColor = isDark ? "#475569" : "#f3f4f6";

  return (
    <article
      className={`w-72 md:w-80 rounded-2xl overflow-hidden
        shadow-md
        ${isDark ? "bg-[#1E293B]" : "bg-white"}`}
    >
      <Skeleton
        height={280}
        baseColor={baseColor}
        highlightColor={highlightColor}
      />

      <div className="p-4 space-y-3">
        <Skeleton height={14} width="100%" />
        <Skeleton height={14} width="80%" />

        <div className="flex justify-between items-center pt-2">
          <Skeleton height={22} width={80} />
          <Skeleton height={18} width={100} />
        </div>
      </div>
    </article>
  );
}
