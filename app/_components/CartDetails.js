"use client";

import { useEffect, useState } from "react";
import { initCart, removeFromCart } from "../_lib/_api/cart";
import CartCard from "./CartCard";
import ToastMessage from "./ToastMessage";
import toast from "react-hot-toast";
import Link from "next/link";

function onRemove(productId) {
  removeFromCart(productId);
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
}

function CartDetails() {
  const [cart, setCart] = useState([]);

  useEffect(() => setCart(initCart()), [onRemove]);

  console.log(cart);
  return (
    <div>
      {cart.length > 0 ? (
        <ul>
          {cart.map((product, index) => (
            <CartCard product={product} key={index} onRemove={onRemove} />
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center mt-10">
          <p className="text-center text-lg text-gray-700 font-medium">
            Your cart is currently empty.
          </p>
          <Link
            className="p-2 mt-4 border-2 border-black rounded-full bg-green-400 text-black font-semibold hover:bg-green-500 hover:scale-105 transition-all duration-300 ease-in-out"
            href="/browse"
          >
            Start by adding products.
          </Link>
        </div>
      )}
    </div>
  );
}

export default CartDetails;
