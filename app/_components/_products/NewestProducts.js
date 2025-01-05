"use client";

import logo from "@/public/logo.png";
import bg from "@/public/bg-1.jpg";
import Image from "next/image";
import { useRef } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import ScrollableProductList from "./ScrollableProductList";
import PaginatedProductList from "./PaginatedProductList";

function NewestProducts({ productsData, userId, showAll = true }) {
  let sortedProductsByDate = productsData.sort((a, b) => {
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
        <ScrollableProductList
          products={sortedProductsByDate}
          userId={userId}
        />
      ) : (
        <PaginatedProductList products={sortedProductsByDate} userId={userId} />
      )}
    </div>
  );
}

export default NewestProducts;
