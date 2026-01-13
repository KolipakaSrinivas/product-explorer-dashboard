"use client";
import ProductsGrid from "./components/ProductsGrid";
import { Product } from "@/app/types";
import { useState, useEffect } from "react";
// async function getProducts(): Promise<Product[]> {
//   try {
//     const res = await fetch("https://fakestoreapi.com/products", {
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       console.error("[getProducts] API error:", res.status);
//       return [];
//     }

//     return await res.json();
//   } catch (err) {
//     console.error("[getProducts] Fetch failed:", err);
//     return [];
//   }
// }

import { ProductCardSkeleton } from "@/app/loading/ProductCardSkeleton";
export default function Home() {
  // const products = await getProducts();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getProducts() {
      try {
        const res = await fetch("https://fakestoreapi.com/products", {
          cache: "no-store",
        });

        if (!res.ok) {
          console.error("[getProducts] API error:", res.status);
          return;
        }

        const data: Product[] = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("[getProducts] Fetch failed:", err);
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, []);

  if (loading) {
    return (
      <div className="mt-20">
        <p className="text-center mt-10 text-gray-500">
          No products available right now. Please check back later.
        </p>
        <div className="grid grid-cols-1 place-items-center md:place-items-stretch md:grid-cols-2 lg:grid-cols-3 gap-5 px-2 pt-4 md:px-18">
          {Array.from({ length: 3 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <main>
      <ProductsGrid products={products} />
    </main>
  );
}
