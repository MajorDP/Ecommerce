"use client";

import { initCart, removeFromCart } from "@/app/_lib/_api/cart";
import { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";
import ToastMessage from "../ToastMessage";

function QuickAddToCart({ handleAddToCart, productId }) {
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const cart = initCart();
    setIsAdded(cart.some((product) => product.id == productId));
  }, [productId]);

  return (
    <button
      onClick={() => {
        if (isAdded) {
          removeFromCart(productId);
          setIsAdded(false);
          toast.success(
            <ToastMessage
              message={"Product removed from cart!"}
              link={`/account/cart`}
              linkMessage={"See your cart"}
            />,
            {
              duration: 5000,
            }
          );
        } else {
          handleAddToCart();
          setIsAdded(true);
          toast.success(
            <ToastMessage
              message={"Product added to cart!"}
              link={`/account/cart`}
              linkMessage={"See your cart"}
            />,
            {
              duration: 5000,
            }
          );
        }
      }}
      className={"w-22 mt-2 hover:text-white hover:scale-110 duration-100"}
    >
      {!isAdded ? (
        <span className="cursor-pointer text-green-600 border-2 border-green-600 mb-2 p-2 rounded-xl hover:bg-gray-200 hover:scale-110 duration-150 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2m0 0h13.15a2 2 0 011.96 2.44l-1.35 6A2 2 0 0117.15 15H7.4m-4.4 0a2 2 0 100 4 2 2 0 000-4zm14 0a2 2 0 100 4 2 2 0 000-4z"
            />
          </svg>
        </span>
      ) : (
        <span className="cursor-pointer text-red-600 border-2 border-red-600 mb-2 p-2 rounded-xl hover:bg-gray-200 hover:scale-110 duration-150 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a2 2 0 00-2 2v1h8V5a2 2 0 00-2-2m-4 0h4"
            />
          </svg>
        </span>
      )}
    </button>
  );
}

export default QuickAddToCart;
