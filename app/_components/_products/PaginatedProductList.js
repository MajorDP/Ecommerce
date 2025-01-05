"use client";
import { useEffect, useState } from "react";
import Spinner from "../Spinner";
import ProductCard from "./ProductCard";
import { getUserInfo } from "@/app/_lib/_api/userServices";

function PaginatedProductList({ products, userId }) {
  const [page, setPage] = useState(0);
  const perPage = 12;
  const startIndex = page * perPage;
  const endIndex = startIndex + perPage;

  return (
    <div className="flex flex-col items-center">
      <ul
        className={`w-[100%] flex justify-center  flex-wrap overflow-hidden whitespace-nowrap scroll-smooth gap-1`}
      >
        {products.length > 0
          ? products
              .slice(startIndex, endIndex)
              .map((product, index) => (
                <ProductCard product={product} key={index} userId={userId} />
              ))
          : "There are no items that match your search."}
      </ul>
      <div className="w-[10%] flex justify-between mt-5">
        <button
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
          className={`border border-black p-2 rounded-md bg-red-400 hover:bg-red-500 active:bg-red-600 disabled:bg-slate-400 disabled:text-gray-300 text-white font-semibold transition-all duration-200 ease-in-out`}
        >
          Prev
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={startIndex + perPage >= products.length}
          className={`border border-black p-2 rounded-md bg-green-400 hover:bg-green-500 active:bg-green-600 disabled:bg-slate-400 disabled:text-gray-300 text-white font-semibold duration-200 ease-in-out`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PaginatedProductList;
