"use client";
import { Product } from "@/app/types";
import { useProductFilters } from "../customhooks/useProductFilters";
import { usePagination } from "../customhooks/usePagination";
import { ProductCardSkeleton } from "@/app/loading/ProductCardSkeleton";

import { useTransition } from "react";

interface Props {
  products: Product[];
}

import Filter from "./Filter";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";

export default function ProductsGrid({ products }: Props) {
  const [isPending, startTransition] = useTransition();
  const {
    products: filteredProducts,
    search,
    setSearch,
    category,
    setCategory,
    sort,
    setSort,
    showFavorites,
    setShowFavorites,
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
