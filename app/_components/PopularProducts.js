"use client";

import logo from "@/public/logo.png";
import bg from "@/public/bg-1.jpg";
import Image from "next/image";
import { useRef } from "react";
import Link from "next/link";

function PopularProducts({
  tempPopularProductsData,
  searchValue = "",
  category = null,
}) {
  const scrollContainerRef = useRef(null);

  const filteredProductsBySearch =
    searchValue !== ""
      ? tempPopularProductsData.filter((product) =>
          product.productName.toLowerCase().includes(searchValue.toLowerCase())
        )
      : tempPopularProductsData;

  const filteredProductsByCategory =
    category !== null
      ? filteredProductsBySearch
          .slice()
          .filter((product) => product.categories.includes(category))
      : filteredProductsBySearch;

  const sortedProductsByRating = filteredProductsByCategory.sort(
    (a, b) => b.rating - a.rating
  );

  function scroll(direction) {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  }

  return (
    <div className="relative">
      {sortedProductsByRating.length > 0 && (
        <>
          <button
            onClick={() => scroll("left")}
            className="z-10 absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white p-2 rounded-full hover:bg-gray-400 hover:text-black"
          >
            &lt;
          </button>
          <ul
            ref={scrollContainerRef}
            className={` px-10 flex flex-row ${
              sortedProductsByRating.length <= 3
                ? "justify-center"
                : "justify-start"
            } overflow-x-hidden whitespace-nowrap scroll-smooth w-[90%] m-auto`}
          >
            {sortedProductsByRating.map((product) => (
              <li
                key={product.id}
                className=" cursor-pointer scale-125 m-10  border-4 border-black rounded-md bg-gray-200 flex flex-col "
              >
                <Link href={`/browse/product/${product.id}`}>
                  <div className="z-10 w-32 h-32 mb-2 relative">
                    <Image
                      src={product.productImg}
                      alt="Product Image"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-start p-1">{product.productName}</p>
                  <p className="flex justify-between items-center p-1 text-start text-orange-600 font-semibold">
                    <span className="hover:scale-110 duration-150">24.22$</span>
                    <span className="cursor-pointer text-black border border-black p-1 rounded-xl hover:scale-110 duration-150">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 3h2l.4 2m0 0L7.6 13H19l1.3-6H6.4m0 0L6 5H3m3 0h2l1 7h10.5m-6.5 0h10l1.3-6H6.4m-3 8a2 2 0 100 4 2 2 0 000-4zm12 0a2 2 0 100 4 2 2 0 000-4z"
                        />
                      </svg>
                    </span>
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2  bg-gray-600 text-white p-2 rounded-full hover:bg-gray-400 hover:text-black"
          >
            &gt;
          </button>
        </>
      )}
    </div>
  );
}

export default PopularProducts;
