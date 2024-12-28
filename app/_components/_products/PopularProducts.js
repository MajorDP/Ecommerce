"use client";

import logo from "@/public/logo.png";
import bg from "@/public/bg-1.jpg";
import Image from "next/image";
import { useRef } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import ScrollableProductList from "./ScrollableProductList";
import PaginatedProductList from "./PaginatedProductList";

function PopularProducts({
  productsData,
  searchValue = "",
  category = null,
  showAll = true,
}) {
  const filteredProductsBySearch =
    searchValue !== ""
      ? productsData.filter((product) =>
          product.productName.toLowerCase().includes(searchValue.toLowerCase())
        )
      : productsData;

  const filteredProductsByCategory =
    category !== null
      ? category === "all"
        ? filteredProductsBySearch
        : filteredProductsBySearch
            .slice()
            .filter((product) => product.categories.includes(category))
      : filteredProductsBySearch;

  let sortedProductsByRating = filteredProductsByCategory
    .filter((product) => product.productRating > 4.9)
    .sort((a, b) => b.rating - a.rating);

  if (showAll === false) {
    sortedProductsByRating = sortedProductsByRating.slice(
      0,
      Math.min(14, sortedProductsByRating.length)
    );
  }

  return (
    <div className="relative">
      {showAll === false ? (
        <ScrollableProductList products={sortedProductsByRating} />
      ) : (
        <PaginatedProductList products={sortedProductsByRating} />
      )}
    </div>
  );
}

export default PopularProducts;
