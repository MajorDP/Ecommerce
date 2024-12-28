"use client";

import { initCart, removeFromCart } from "@/app/_lib/_api/cart";
import { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";
import ToastMessage from "../ToastMessage";

function AddToCartButton({ handleAddToCart, productId, children }) {
  console.log(productId);
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
      className={` ${
        !children
          ? isAdded
            ? "bg-orange-500 hover:bg-orange-600"
            : "bg-green-500 hover:bg-green-600"
          : ""
      } ${
        !children && " border border-black rounded-md p-2"
      } w-22 mt-2 hover:text-white hover:scale-110 duration-100`}
    >
      {children ? children : isAdded ? "Remove from cart" : "Add to cart"}
    </button>
  );
}

export default AddToCartButton;
