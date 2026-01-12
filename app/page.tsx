import ProductsGrid from "./components/ProductsGrid";

import { Product } from "@/app/types";

async function getProducts(): Promise<Product[]> {
  const res = await fetch("https://fakestoreapi.com/products", {
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  const text = await res.text();

  if (!text) {
    return [];
  }

  try {
    const products: Product[] = JSON.parse(text);
    return Array.isArray(products) ? products : [];
  } catch {
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
