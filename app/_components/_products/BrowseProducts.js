"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import ProductCard from "./ProductCard";
import ScrollableProductList from "./ScrollableProductList";
import PaginatedProductList from "./PaginatedProductList";

function BrowseProducts({
  productsData,
  searchValue = "",
  category = null,
  showAll = true,
}) {
  if (showAll === false) {
    productsData = productsData.slice(0, Math.min(14, productsData.length));
  }

  return (
    <div className="relative">
      {showAll === false ? (
        <ScrollableProductList products={productsData} />
      ) : (
        <PaginatedProductList products={productsData} />
      )}
    </div>
  );
}

export default BrowseProducts;
