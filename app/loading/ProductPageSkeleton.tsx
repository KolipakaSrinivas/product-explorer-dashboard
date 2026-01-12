"use client";
import Skeleton from "react-loading-skeleton";
import { useTheme } from "next-themes";

export default function ProductPage() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const baseColor = isDark ? "#334155" : "#e5e7eb";
  const highlightColor = isDark ? "#475569" : "#f3f4f6";
  return (
    <main
      className={`min-h-screen mt-20 px-4 md:px-20 py-12
          ${isDark ? "bg-[#0F172A]" : "bg-gray-50"}`}
    >
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-10 rounded-3xl p-6
            ${isDark ? "bg-[#1E293B]" : "bg-white shadow-lg"}`}
      >
        {/* IMAGE */}
        <Skeleton
          height={380}
          borderRadius={16}
          baseColor={baseColor}
          highlightColor={highlightColor}
        />

        {/* CONTENT */}
        <div className="space-y-4">
          <Skeleton width={120} />
          <Skeleton height={32} width="80%" />
          <Skeleton width={160} />
          <Skeleton count={4} />
          <Skeleton height={40} width={120} />

          <div className="flex gap-4 mt-8">
            <Skeleton height={56} width="100%" />
            <Skeleton height={56} width={80} />
          </div>
        </div>
      </div>
    </main>
  );
}
