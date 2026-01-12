"use client";
import { useEffect, useState } from "react";

type FilterProps = {
  search: string;
  handleSearch: (value: string) => void;
  category: string;
  handleCategory: (value: string) => void;
  sort: string;
  handleSort: (value: string) => void;
  setShowFavorites: (value: boolean) => void;
  showFavorites: boolean;
};

export default function Filter({
  search,
  handleSearch,
  category,
  handleCategory,
  sort,
  handleSort,
  setShowFavorites,
  showFavorites,
}: FilterProps) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    async function getCategories() {
      try {
        const res = await fetch(
          "https://fakestoreapi.com/products/categories",
          { cache: "no-store" }
        );
        const data: string[] = await res.json();
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    }
    getCategories();
  }, []);

  return (
    <section className="py-3.5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <input
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          type="text"
          placeholder="Search products..."
          className="w-full rounded-xl border border-gray-300 px-4 py-3"
        />

        <select
          className="w-full rounded-xl border border-gray-300 px-4 py-3"
          value={category}
          onChange={(e) => handleCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={sort}
          className="w-full rounded-xl border border-gray-300 px-4 py-3"
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="low-high">Price: Low → High</option>
          <option value="high-low">Price: High → Low</option>
        </select>

        <button
          onClick={() => setShowFavorites((prev) => !prev)}
          className={`cursor-pointer  rounded-xl border px-4 py-3 font-medium transition 
          ${showFavorites ? "" : ""}`}
        >
          ❤️ Favorites
        </button>
      </div>
    </section>
  );
}
