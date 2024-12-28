"use client";

import logo from "@/public/logo.png";
import bg from "@/public/bg-1.jpg";
import Image from "next/image";
import { useRef } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import ScrollableProductList from "./ScrollableProductList";
import PaginatedProductList from "./PaginatedProductList";

function NewestProducts({
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
      ? filteredProductsBySearch
          .slice()
          .filter((product) => product.categories.includes(category))
      : filteredProductsBySearch;

  let sortedProductsByDate = filteredProductsByCategory.sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);

    return dateB.getTime() - dateA.getTime();
  });

  if (showAll === false) {
    sortedProductsByDate = sortedProductsByDate.slice(
      0,
      Math.min(14, sortedProductsByDate.length)
    );
  }

  return (
    <div className="relative">
      {showAll === false ? (
        <ScrollableProductList products={sortedProductsByDate} />
      ) : (
        <PaginatedProductList products={sortedProductsByDate} />
      )}
    </div>
  );
}

export default NewestProducts;
