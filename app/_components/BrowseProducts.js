"use client";

import Image from "next/image";
import Link from "next/link";

function BrowseProducts({
  tempProductsData,
  searchValue = "",
  category = null,
}) {
  console.log(category);
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

  const filteredProductsByCategory =
    category !== null
      ? filteredProductsBySearch
          .slice()
          .filter((product) => product.categories.includes(category))
      : filteredProductsBySearch;

  return (
    <ul className="mt-6 flex flex-wrap justify-center items-center ">
      {filteredProductsByCategory.length > 0
        ? filteredProductsByCategory.map((product) => (
            <li
              key={product.id}
              className="cursor-pointer scale-125 m-10  border-4 border-black rounded-md bg-gray-200 flex flex-col "
            >
              <Link href={`/browse/product/${product.id}`}>
                <div className="z-10 h-32 mb-2 relative">
                  <Image
                    src={product.productImg}
                    alt="Product Image"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-start p-1">{product.productName}</p>
                <p className=" flex justify-between items-center p-1 text-start text-orange-600 font-semibold">
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
          ))
        : "There are no items that match your search."}
    </ul>
  );
}

export default BrowseProducts;
