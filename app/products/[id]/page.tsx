import { notFound } from "next/navigation";
import ProductPage from "../ProductPage";
import { Product } from "@/app/types";

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) notFound();

  const text = await res.text();
  if (!text) notFound();

  let product: Product;

  try {
    product = JSON.parse(text);
  } catch {
    notFound();
  }

  if (!product?.id) notFound();

  return product;
}

interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  const { id } = params;
  const product = await getProduct(id);

  return <ProductPage product={product} />;
}
