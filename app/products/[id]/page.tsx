import { notFound } from "next/navigation";
import ProductPage from "../ProductPage";
import { Product } from "@/app/types";

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  const product = await res.json();

  if (!product?.id) {
    notFound();
  }

  return product;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  return <ProductPage product={product} />;
}
