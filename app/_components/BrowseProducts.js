"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import ProductCard from "./ProductCard";
import ScrollableProductList from "./ScrollableProductList";
import PaginatedProductList from "./PaginatedProductList";

function BrowseProducts({
  tempProductsData,
  searchValue = "",
  category = null,
  showAll = true,
}) {
  const filteredProductsBySearch =
    searchValue !== ""
      ? tempProductsData
          .slice()
          .filter((product) =>
            product.productName
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          )
      : tempProductsData;

  let filteredProductsByCategory =
    category !== null
      ? category === "all"
        ? filteredProductsBySearch
        : filteredProductsBySearch
            .slice()
            .filter((product) => product.categories.includes(category))
      : filteredProductsBySearch;

  if (showAll === false) {
    filteredProductsByCategory = filteredProductsByCategory.slice(
      0,
      Math.min(14, filteredProductsByCategory.length)
    );
  }

  return (
    <div className="relative">
      {showAll === false ? (
        <ScrollableProductList products={filteredProductsByCategory} />
      ) : (
        <PaginatedProductList products={filteredProductsByCategory} />
      )}
    </div>
  );
}

export default BrowseProducts;
