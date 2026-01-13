"use client";
import { useApp } from "@/app/providers/AppContext";
import { useState, useMemo } from "react";
import { Product } from "@/app/types";

export function useProductFilters(products: Product[]) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const { favorites } = useApp();

  /* FILTER */
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());

      const matchCategory = category === "all" || p.category === category;

      const matchFavorites = !showFavorites || favorites.includes(p.id);

      return matchSearch && matchCategory && matchFavorites;
    });
  }, [products, search, category, showFavorites, favorites]);

  /* SORT */
  const sortedProducts = useMemo(() => {
    if (!sort) return filteredProducts;

    return [...filteredProducts].sort((a, b) => {
      if (sort === "low-high") return a.price - b.price;
      if (sort === "high-low") return b.price - a.price;
      return 0;
    });
  }, [filteredProducts, sort]);

  return {
    products: sortedProducts,
    search,
    setSearch,
    category,
    setCategory,
    sort,
    setSort,
    showFavorites,
    setShowFavorites,
  };
}
