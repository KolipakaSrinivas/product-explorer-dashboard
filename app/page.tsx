import ProductsGrid from "./components/ProductsGrid";

import { Product } from "@/app/types";

async function getProducts(): Promise<Product[]> {
  const res = await fetch("https://fakestoreapi.com/products", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export default async function Home() {
  const products = await getProducts();
  return (
    <main>
      <ProductsGrid products={products} />
    </main>
  );
}
