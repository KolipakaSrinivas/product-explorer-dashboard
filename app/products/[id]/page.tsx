export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import ProductPage from "../ProductPage";
import { Product } from "@/app/types";


export async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(
      `https://fakestoreapi.com/products/${id}`,
      {
        cache: "no-store",
        headers: {
          "User-Agent": "Mozilla/5.0",
        },
      }
    );

    if (!res.ok) {
      console.error("HTTP error:", res.status);
      return null;
    }

    return (await res.json()) as Product;
  } catch (err) {
    console.error("getProduct error:", err);
    return null;
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
