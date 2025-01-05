"use client";

import { useState } from "react";

import muay1 from "@/public/muay1.png";
import muay2 from "@/public/muay2.png";
import Image from "next/image";
import Link from "next/link";
import { getProducts } from "../_lib/_api/productServices";
import DeleteBtn from "./_buttons/ButtonActions";
import ButtonActions from "./_buttons/ButtonActions";
import { formatDate } from "../_lib/helpers";
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

  const totalPrice = sale?.items.reduce(
    (acc, item) => acc + item.productPrice,
    0
  );

  return (
    <div className="flex flex-col sm:flex-row justify-around items-center bg-gray-50 border-2 border-gray-300 rounded-md w-[90%] m-auto h-[80vh] mt-5 overflow-scroll sm:overflow-hidden shadow-lg">
      <div className="relative mb-10 flex items-center justify-center w-full">
        {sale.items.length > 1 && (
          <button
            onClick={() => changeImage("left")}
            className="z-10 absolute left-0 sm:left-[25%] top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-3 rounded-full hover:bg-gray-500 hover:text-black transition-all duration-200"
          >
            &lt;
          </button>
        )}

        <div className="w-[400px] h-[400px] flex flex-col items-center justify-center">
          <img
            src={
              sale.items[imageIndex].options
                ? sale.items[imageIndex].options.img
                : sale.items[imageIndex].productImg[0]
            }
            alt={sale.items[imageIndex]}
            className="border-2 m-auto border-gray-400 rounded-xl bg-white sm:h-full sm:max-w-[400px] shadow-md"
          />
        </div>

        {sale.items.length > 1 && (
          <button
            onClick={() => changeImage("right")}
            className="z-10 absolute right-0 sm:right-[25%] top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-3 rounded-full hover:bg-gray-500 hover:text-black transition-all duration-200"
          >
            &gt;
          </button>
        )}
      </div>

      <div className="flex flex-col justify-between h-[50%] w-[60%] mb-20">
        <div>
          <p className="text-xl font-semibold text-gray-800">
            <span className="font-bold">Sale ID:</span> {sale?.id}
          </p>
          <p className="text-gray-800">
            <span className="font-bold">Ordered on:</span>{" "}
            {formatDate(sale?.created_at)}
          </p>
        </div>
        <div>
          <p className="text-gray-700">
            <span className="font-bold">Item:</span>{" "}
            {sale.items[imageIndex].productName}
          </p>
          <p className="text-gray-700">
            <span className="font-bold">Quantity ordered:</span>{" "}
            {sale.items[imageIndex].quantity}
          </p>
          <p className="text-gray-700">
            <span className="font-bold">Price per unit:</span>{" "}
            {sale.items[imageIndex].productPrice.toFixed(2)}{" "}
            <span className="text-green-600 font-semibold">$</span>
          </p>
        </div>
        <div>
          <p className="text-lg text-gray-800">
            <span className="font-bold">Total:</span> {totalPrice.toFixed(2)}{" "}
            <span className="text-green-600 font-semibold">$</span>
          </p>
          <p className="bg-orange-400 border border-black rounded-md w-[6rem] text-center mt-2 hover:bg-orange-500 transition-all duration-200">
            <Link
              href={`/browse/product/${sale.items[imageIndex].id}`}
              className="text-black font-semibold"
            >
              See in store
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CurrentSale;
