export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import ProductPage from "../ProductPage";
// import { Product } from "@/app/types";


export async function getProduct(id: string) {
  try {
    const res = await fetch(
      `https://fakestoreapi.com/products/${id}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      console.error("HTTP error:", res.status);
      notFound();
    }

    const text = await res.text();
    if (!text.trim()) {
      console.error("Empty response body");
      notFound();
    }

    const product = JSON.parse(text);

    return product;
  } catch (err) {
    console.error("Server fetch failed:", err);
    notFound();
  }
}

interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
   const { id } = await params;
  const product = await getProduct(id);

  return <ProductPage product={product} />;
}
