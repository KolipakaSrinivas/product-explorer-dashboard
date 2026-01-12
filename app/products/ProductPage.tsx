"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useApp } from "@/app/providers/AppContext";
import { Product } from "@/app/types";
import StarRating from "@/app/components/StarRating";

type Props = {
  product: Product;
};

export default function ProductPage({ product }: Props) {
  const { resolvedTheme } = useTheme();

  const isDark = resolvedTheme === "dark";
  const { favorites, toggleFavorite, addToCart, removeFromCart, cartItems } =
    useApp();

  const isfavorite = favorites.includes(product.id);
  const isCartItem = cartItems.some((item) => item.id === product.id);

  return (
    <main
      className={`min-h-screen mt-12 px-4 md:px-20 py-12
        ${isDark ? "bg-[#0F172A]" : "bg-gray-50"}`}
    >
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-10 rounded-3xl p-6
          ${
            isDark
              ? "bg-[#1E293B] border border-white/10 shadow-xl"
              : "bg-white shadow-lg"
          }`}
      >
        {/* IMAGE */}
        <div
          className={`relative h-96 md:h-[380px] rounded-2xl
            ${isDark ? "bg-[#020617]" : "bg-gray-100"}`}
        >
          <Image
            src={product.image}
            alt={product.title}
            fill
            priority
            className="object-contain p-6"
          />

          <button
            onClick={() => toggleFavorite(product.id)}
            className={`absolute top-4 right-4 h-12 w-12 rounded-full
              flex items-center justify-center backdrop-blur
              transition hover:scale-110 active:scale-95
              ${isDark ? "bg-white/10 text-red-400" : "bg-white shadow-md"}`}
          >
            <span className="text-2xl">{isfavorite ? "❤️" : "♡"}</span>
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-sm uppercase tracking-wide text-gray-500">
              {product.category}
            </span>

            <h1 className="text-2xl md:text-3xl font-bold">{product.title}</h1>
            <p className="text-gray-600">{product.description}</p>
            <div className="text-3xl font-bold">₹{product.price}</div>
          </div>
          <div className="space-y-4 pt-6">
            {/* Rating */}
            <StarRating
              rating={product.rating.rate}
              reviewsCount={product.rating.count}
              isDark={isDark}
            />

            {/* Add to Cart */}
            <button
              onClick={() =>
                isCartItem ? removeFromCart(product.id) : addToCart(product)
              }
              className={`w-full cursor-pointer py-3 rounded-xl font-semibold text-lg
      transition active:scale-95
      ${
        isDark
          ? "bg-indigo-600 hover:bg-indigo-500 text-white"
          : "bg-black hover:bg-gray-800 text-white"
      }`}
            >
              {isCartItem ? "🛒 Remove from Cart" : "🛒 Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
