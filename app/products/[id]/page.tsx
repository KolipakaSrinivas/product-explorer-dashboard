"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProductPage from "../ProductPage";
import { Product } from "@/app/types";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function getProduct() {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          console.error("HTTP error:", res.status);
          router.push("/404");
          return;
        }

        const data = (await res.json()) as Product;
        setProduct(data);
      } catch (err) {
        console.error("getProduct error:", err);
        router.push("/404");
      } finally {
      }
    }

    if (id) getProduct();
  }, [id, router]);

  if (!product) {
    return null; // redirect already triggered
  }

  return <ProductPage product={product} />;
}
