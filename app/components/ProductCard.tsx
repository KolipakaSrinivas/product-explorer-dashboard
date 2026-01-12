"use client";
import Link from "next/link";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Product } from "@/app/types";

interface Props {
  product: Product;
}

import { useApp } from "@/app/providers/AppContext";

export default function ProductCard({ product }: Props) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const { favorites, toggleFavorite, addToCart, removeFromCart, cartItems } =
    useApp();
  const isfavorite = favorites.includes(product.id);
  const isCartItem = cartItems.some((item) => item.id === product.id);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <article
      className={`group h-[320px] w-80 md:h-92  md:w-75 rounded-2xl overflow-hidden
        shadow-md hover:shadow-xl transition
        ${isDark ? "bg-[#1E293B]" : "bg-white"} cursor-pointer`}
    >
      {/* IMAGE */}
      <div className=" relative h-56 sm:h-60 md:h-64 lg:h-72 xl:h-80">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-4"
          unoptimized
        />

        {/* FAVORITE */}
        <button
          onClick={() => toggleFavorite(product.id)}
          aria-label="Toggle favorite"
          className={`
            absolute cursor-pointer top-3 right-3
            flex items-center justify-center
            h-10 w-10 rounded-full
            backdrop-blur-md
            shadow-md
            transition-all duration-200
            hover:scale-110 active:scale-95
            sm:bg-none
            ${
              isDark
                ? "bg-gray-800/80 text-white hover:bg-gray-700"
                : "bg-white/90 text-gray-900 hover:bg-gray-100"
            }
            `}
        >
          <span
            className={`text-xl transition-transform duration-200
              ${isfavorite ? "scale-110" : "scale-100"}
              `}
          >
            {isfavorite ? "❤️" : "♡"}
          </span>
        </button>
        <div className="sm:flex flex-col">
          <button
            onClick={() =>
              isCartItem ? removeFromCart(product.id) : addToCart(product)
            }
            className={`
    cursor-pointer absolute bottom-3 left-1/2 -translate-x-[110%]
    px-6 py-2 rounded-lg text-sm
    opacity-100 translate-y-0
    md:opacity-0 md:translate-y-4
    md:group-hover:opacity-100 md:group-hover:translate-y-0
    transition-all
    ${isDark ? "bg-white text-black" : "bg-black text-white"}
  `}
          >
            {isCartItem ? "Remove" : "Add to Cart"}
          </button>

          {/* VIEW DETAILS */}
          <Link href={`/products/${product.id}`}>
            <button
              className={`
      cursor-pointer absolute bottom-3 left-1/2 translate-x-[10%]
      px-6 py-2 rounded-lg text-sm
      opacity-100 translate-y-0
      md:opacity-0 md:translate-y-4
      md:group-hover:opacity-100 md:group-hover:translate-y-0
      transition-all
      ${isDark ? "bg-slate-700 text-white" : "bg-gray-800 text-white"}
    `}
            >
              View Details
            </button>
          </Link>
        </div>
      </div>

      {/* CONTENT */}
      <div className="py-2 px-5 ">
        <h2
          className={`text-sm font-semibold line-clamp-2 truncate
            ${isDark ? "text-gray-100" : "text-gray-800"}`}
        >
          {product.title}
        </h2>

        <div className="flex items-center justify-between mt-2">
          <span
            className={`text-lg font-bold
            ${isDark ? "text-white" : "text-gray-900"}`}
          >
            ₹{product.price}
          </span>

          {/* RATING */}
          <div className="flex justify-center items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`text-2xl ${
                  i < Math.round(product.rating.rate)
                    ? "text-amber-400"
                    : isDark
                    ? "text-gray-600"
                    : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
            <span
              className={`text-xs ml-1
                ${isDark ? "text-gray-400" : "text-gray-500"}`}
            >
              ({product.rating.count})
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
