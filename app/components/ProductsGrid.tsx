"use client";
import { Product } from "@/app/types";
import { useProductFilters } from "../customhooks/useProductFilters";
import { usePagination } from "../customhooks/usePagination";
import { ProductCardSkeleton } from "@/app/loading/ProductCardSkeleton";

import { useState, useTransition } from "react";

interface Props {
  products: Product[];
}

import Filter from "./Filter";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";

export default function ProductsGrid({ products }: Props) {
  const [showFavorites, setShowFavorites] = useState(false);
  const [isPending, startTransition] = useTransition();
  const {
    products: filteredProducts,
    search,
    setSearch,
    category,
    setCategory,
    sort,
    setSort,
  } = useProductFilters(products);

  const { paginatedItems, page, setPage, totalPages } = usePagination(
    filteredProducts,
    8
  );

  /* handlers wrapped in transition */
  const handleSearch = (value: string) => {
    startTransition(() => {
      setSearch(value);
      setPage(1); // reset page on filter change
    });
  };

  const handleCategory = (value: string) => {
    startTransition(() => {
      setCategory(value);
      setPage(1);
    });
  };

  const handleSort = (value: string) => {
    startTransition(() => {
      setSort(value);
    });
  };

  if (products.length == 0) {
    return (
      <div className="mt-20">
        <p className="text-center mt-10 text-gray-500">
          No products available right now. Please check back later.
        </p>
        <div className="grid grid-cols-1 place-items-center md:place-items-stretch md:grid-cols-2 lg:grid-cols-3 gap-5 px-2 pt-4 md:px-18">
          {Array.from({ length: 3 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="mt-18 px-5 md:px-20 py-3">
      <Filter
        handleSearch={handleSearch}
        handleCategory={handleCategory}
        handleSort={handleSort}
        search={search}
        category={category}
        sort={sort}
        showFavorites={showFavorites}
        setShowFavorites={setShowFavorites}
      />
      <p className="text-xl md:px-1">
        <span className="pr-2">{filteredProducts.length}</span>
        products found
      </p>
      <div className="grid grid-cols-1 place-items-center md:place-items-stretch md:grid-cols-2 lg:grid-cols-3 gap-5 px-2 pt-4">
        {isPending
          ? Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          : paginatedItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </section>
  );
}
