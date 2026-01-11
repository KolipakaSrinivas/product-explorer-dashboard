"use client";

import Image, { StaticImageData } from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type ThemeHelperProps = {
  lightType: StaticImageData;
  darkType: StaticImageData;
  width: number;
  height: number;
  alt?: string;
};

export default function ThemeHelper({
  darkType,
  lightType,
  width,
  height,
  alt = "image",
}: ThemeHelperProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Image
      src={resolvedTheme === "dark" ? darkType : lightType}
      alt={alt}
      width={width}
      height={height}
    />
  );
}
