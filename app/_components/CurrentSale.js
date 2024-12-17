"use client";

import { useState } from "react";

import muay1 from "@/public/muay1.png";
import muay2 from "@/public/muay2.png";
import Image from "next/image";
import Link from "next/link";
import { getProducts } from "../_lib/_api/productServices";
import DeleteBtn from "./_buttons/ButtonActions";
import ButtonActions from "./_buttons/ButtonActions";
function CurrentSale({ sale }) {
  const [imageIndex, setImageIndex] = useState(0);

  function changeImage(direction) {
    if (direction === "right" && sale.items.length - 1 === imageIndex) {
      setImageIndex(0);
    } else if (direction === "right" && sale.items.length - 1 > imageIndex) {
      setImageIndex(imageIndex + 1);
    } else if (direction === "left" && imageIndex !== 0) {
      setImageIndex(imageIndex - 1);
    } else if (direction === "left" && imageIndex === 0) {
      setImageIndex(sale.items.length - 1);
    }
  }
  return (
    <div className="flex justify-around items-center bg-blue-100 border border-black rounded-md w-[90%] m-auto h-[80vh] mt-5">
      <div className="relative mb-10 flex items-center justify-center w-full">
        {/* Left Button */}
        <button
          onClick={() => changeImage("left")}
          className="z-10 absolute left-[25%] top-1/2 transform -translate-y-1/2 bg-gray-600 text-white p-2 rounded-full hover:bg-gray-400 hover:text-black"
        >
          &lt;
        </button>

        {/* Image */}
        <div className="w-[400px] h-[400px] flex flex-col items-center justify-center ">
          <img
            src={sale.items[imageIndex].productImg[0]}
            alt={sale.items[imageIndex]}
            className="border m-auto border-black rounded-xl bg-white h-full max-w-[400px]"
          />
        </div>

        {/* Right Button */}
        <button
          onClick={() => changeImage("right")}
          className="z-10 absolute right-[25%] top-1/2 transform -translate-y-1/2 bg-gray-600 text-white p-2 rounded-full hover:bg-gray-400 hover:text-black"
        >
          &gt;
        </button>
      </div>

      <div className="flex flex-col justify-between h-[50%] w-[60%] mb-20">
        <div>
          <p className="text-xl">Sale ID: {sale?.orderId}</p>
          <p>Ordered on: {sale?.orderDate}</p>
        </div>
        <div>
          <p>Item: {sale.items[imageIndex].name}</p>
          <p>Quantity ordered: {sale.items[imageIndex].quantity}</p>
          <p>Price per unit: {sale.items[imageIndex].pricePerUnit} 💲</p>
        </div>
        <div>
          <p>Total: {sale?.totalPrice} 💲</p>
          <p className="bg-orange-300 border border-black rounded-md w-[6rem] text-center">
            <Link href={`/browse/product/${sale.items[imageIndex].id}`}>
              See in store
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CurrentSale;
