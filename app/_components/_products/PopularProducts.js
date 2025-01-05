"use client";

import logo from "@/public/logo.png";
import bg from "@/public/bg-1.jpg";
import Image from "next/image";
import { useRef } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import ScrollableProductList from "./ScrollableProductList";
import PaginatedProductList from "./PaginatedProductList";

function PopularProducts({ productsData, userId, showAll = true }) {
  let sortedProductsByRating = productsData
    .filter((product) => product.productRating > 4.9)
    .sort((a, b) => b.productRating - a.productRating);

  if (showAll === false) {
    sortedProductsByRating = sortedProductsByRating.slice(
      0,
      Math.min(14, sortedProductsByRating.length)
    );
  }

  return (
    <div className="relative">
      {showAll === false ? (
        <ScrollableProductList
          products={sortedProductsByRating}
          userId={userId}
        />
      ) : (
        <PaginatedProductList
          products={sortedProductsByRating}
          userId={userId}
        />
      )}
    </div>
  );
}

export default PopularProducts;
