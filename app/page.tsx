export const dynamic = "force-dynamic";

import ProductsGrid from "./components/ProductsGrid";
import { Product } from "@/app/types";

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("[getProducts] API error:", res.status);
      return [];
    }

    return await res.json();
  } catch (err) {
    console.error("[getProducts] Fetch failed:", err);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main>
      <ProductsGrid products={products} />
    </main>
  );
}
