"use client";

import { useEffect, useState } from "react";
import { getCurrentUser, getUserProducts } from "../_lib/_api/userServices";
import Link from "next/link";

function UserProductCard({ product }) {
  const imgLength =
    product.productImg.length === 1
      ? 1
      : product.productImg.length >= 4
      ? 4
      : 2;

  const normalizedTimestamp = product.created_at.split(".")[0] + "Z";
  const date = new Date(normalizedTimestamp);
  const formattedDate = date.toLocaleDateString();
  console.log(formattedDate);
  return (
    <Link
      href={`/browse/product/${product.id}`}
      className="m-auto bg-gradient-to-tr from-teal-100 to-teal-300 w-[60%] h-[30vh] flex flex-row justify-between border border-black rounded-xl p-3 mt-2 mb-6 "
    >
      <div
        className={`grid bg-white ${
          //singular size for pictures regardless of amount
          "h-full w-[46%]"
          // size of pictures based on amount:
          // imgLength === 1 ? "w-1/3" : imgLength === 4 ? "h-full" : "w-[55%]"
        } ${
          imgLength >= 4
            ? "grid-cols-2 grid-rows-2"
            : imgLength === 2
            ? "grid-cols-2 grid-rows-1"
            : "grid-cols-1 grid-rows-1"
        }`}
      >
        {product.productImg.map((img, index) =>
          (index > 1 && imgLength === 2) || (index > 3 && imgLength === 4) ? (
            ""
          ) : (
            <img
              key={index}
              src={img}
              alt="Product Image"
              className={`border border-black object-contain w-full h-full  ${
                index % 2 === 1 ? "border-l-0" : ""
              } ${index <= 1 && imgLength > 2 ? "border-b-0" : ""}
              }`}
            />
          )
        )}
      </div>
      <div className="w-[40%] flex flex-col justify-between text-xl border border-black p-5">
        <div>
          <p>Product ID: {product.id}</p>
          <p>Listed on: {formattedDate}</p>
        </div>
        <div>
          <p>Price: {product.productPrice} 💲</p>
        </div>
      </div>
    </Link>
  );
}

export default UserProductCard;
