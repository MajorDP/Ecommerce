"use client";
import { addToCart } from "@/app/_lib/_api/cart";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "../_buttons/AddToCartButton";
import toast from "react-hot-toast";
import QuickAddToCart from "../_buttons/QuickAddToCart";
import { useEffect, useState } from "react";
import { getUserInfo } from "@/app/_lib/_api/userServices";

function ProductCard({ product, userId }) {
  const handleAddToCart = async (params) => {
    try {
      const newProduct = {
        ...product,
        options: product.options ? product.options[0] : null,
        quantity: 1,
      };
      addToCart(newProduct);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <li className="cursor-pointer m-2 border-2 border-black rounded-lg bg-white shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 flex flex-col w-28 sm:w-44">
      <Link
        href={`/browse/product/${product.id}`}
        className="flex flex-col items-center "
      >
        <div className="z-10 h-28 w-28 sm:h-44 sm:w-44 mb-2 relative overflow-hidden border-2 border-t-0 rounded-b-none border-black rounded-lg">
          <img
            src={product.productImg}
            alt="Product Image"
            className="object-cover w-full h-full hover:scale-110 transition-transform duration-300"
          />
        </div>

        <p className="text-start px-2 text-xs sm:text-sm text-gray-700 font-medium truncate w-full">
          {product.productName}
        </p>

        <p className="flex justify-between items-center px-2 text-start text-orange-600 font-semibold w-full">
          <span className="hover:scale-110 duration-150">
            {product.discountedPrice ? (
              <span className="flex flex-col">
                <span className="line-through text-gray-400 text-[0.7rem] sm:text-xs mr-1">
                  {(product.productPrice + product.shippingFee || 0).toFixed(2)}{" "}
                  $
                </span>
                <span className="text-xs sm:text-sm">
                  {(product.discountedPrice + product.shippingFee || 0).toFixed(
                    2
                  )}{" "}
                  $
                </span>
              </span>
            ) : (
              <span className="text-xs sm:text-sm">
                {product.productPrice.toFixed(2)} $
              </span>
            )}
          </span>
          {userId !== product.listedBy ? (
            <span
              onClick={(e) => e.preventDefault()} //to stop event propagation
            >
              <QuickAddToCart
                handleAddToCart={handleAddToCart}
                productId={product.id}
              />
            </span>
          ) : (
            <span className="mt-2 cursor-pointer text-blue-600 border-2 border-blue-600 mb-2 p-1 sm:p-2 rounded-xl hover:bg-gray-200 hover:scale-110 duration-150 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-5 sm:w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35M17 10a7 7 0 10-14 0 7 7 0 0014 0z"
                />
              </svg>
            </span>
          )}
        </p>
      </Link>
    </li>
  );
}

export default ProductCard;
