"use client";

import { useEffect, useState } from "react";
import { getCurrentUser, getUserProducts } from "../../_lib/_api/userServices";
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
  return (
    <Link
      href={`/browse/product/${product.id}`}
      className="m-auto bg-gradient-to-bl from-slate-300 to-blue-300  w-[90%] sm:w-[60%] h-full sm:h-[30vh] flex flex-col sm:flex-row justify-between border border-black  rounded-xl p-3 mt-2 mb-6 transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105"
    >
      <div
        className={`grid bg-white ${
          // Singular size for pictures regardless of amount
          "h-full w-full sm:w-[46%]"
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
              className={`border border-gray-200 object-fit w-full h-full ${
                index % 2 === 1 ? "border-l-0" : ""
              } ${index <= 1 && imgLength > 2 ? "border-b-0" : ""}`}
            />
          )
        )}
      </div>
      <div className="w-full sm:w-[54%] flex flex-col justify-between text-xl border border-gray-300 p-5 rounded-tr-xl rounded-br-xl">
        <div>
          <p className="font-bold">{product.productName}</p>
          <p className="text-sm sm:text-base text-gray-700">
            <span className="font-semibold">Product ID:</span> {product.id}
          </p>
          <p className="text-sm sm:text-base text-gray-700">
            <span className="font-semibold">Listed on:</span> {formattedDate}
          </p>
        </div>
        <div>
          <p className="text-sm sm:text-base text-gray-700">
            <span className="font-semibold">Price:</span>{" "}
            {product.discountedPrice
              ? (product.discountedPrice + product.shippingFee).toFixed(2) || 0
              : (product.productPrice + product.shippingFee).toFixed(2)}{" "}
            <span className="text-green-600 font-semibold">$</span>
          </p>
        </div>
      </div>
    </Link>
  );
}

export default UserProductCard;
