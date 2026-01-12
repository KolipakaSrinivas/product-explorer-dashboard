import ProductsGrid from "./components/ProductsGrid";

import { Product } from "@/app/types";

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("[getProducts] API error:", res.status, res.statusText);
      return [];
    }

    const text = await res.text();

    if (!text) {
      console.error("[getProducts] Empty response body");
      return [];
    }

    try {
      const products = JSON.parse(text);

      if (!Array.isArray(products)) {
        console.error("[getProducts] Invalid data shape:", products);
        return [];
      }

      return products;
    } catch (err) {
      console.error("[getProducts] JSON parse failed:", err, text);
      return [];
    }
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
