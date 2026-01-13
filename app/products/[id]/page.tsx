import { notFound } from "next/navigation";
import ProductPage from "../ProductPage";
import { Product } from "@/app/types";

export async function getProduct(id: string) {
  try {
    const res = await fetch(
      `https://fakestoreapi.com/products/${id}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      console.error("Fetch failed:", res.status, res.statusText);
      notFound();
    }

    const product = (await res.json()) as Product;

    return product;
  } catch (error) {
    console.error("getProduct error:", error);
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
