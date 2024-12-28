"use client";
import { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import { getUserInfo } from "@/app/_lib/_api/userServices";

function ScrollableProductList({ products }) {
  const scrollContainerRef = useRef(null);

  const [user, setUser] = useState(null);

  useEffect(function () {
    async function getUser() {
      const user = await getUserInfo();

      setUser(user);
    }
    getUser();
  }, []);

  function scroll(direction) {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -330 : 330,
        behavior: "smooth",
      });
    }
  }
  return (
    <>
      {products.length > 5 && (
        <button
          onClick={() => scroll("left")}
          className="z-50 absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white p-2 rounded-full hover:bg-gray-400 hover:text-black"
        >
          &lt;
        </button>
      )}
      <ul
        ref={scrollContainerRef}
        className={`w-[95%] p-2 px-10 flex flex-row ${
          products.length < 6 ? "justify-center" : "justify-start"
        } overflow-x-hidden whitespace-nowrap scroll-smooth m-auto`}
      >
        {products.length > 0
          ? products.map((product, index) => (
              <ProductCard
                product={product}
                userId={user?.userId}
                key={index}
              />
            ))
          : "There are no items that match your search."}
      </ul>
      {products.length > 5 && (
        <button
          onClick={() => scroll("right")}
          className="z-50 absolute right-0 top-1/2 transform -translate-y-1/2  bg-gray-600 text-white p-2 rounded-full hover:bg-gray-400 hover:text-black"
        >
          &gt;
        </button>
      )}
    </>
  );
}

export default ScrollableProductList;
