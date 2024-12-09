"use client";

import muay1 from "@/public/muay1.png";
import muay2 from "@/public/muay2.png";
import Image from "next/image";
import { useState } from "react";

function Page({ params }) {
  const [imageIndex, setImageIndex] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);

  const tempRequestedProductData = {
    productId: 1,
    productName: "Muay thai shorts",
    productImg: [muay1, muay2],
    productPrice: 55.55,
    productDescription: "Boxing and Muay thai shorts, sport shorts",
    productRating: 5.5,
    productOptions: ["S", "M", "L", "XL"],
    isShippingFree: true,
  };

  const shippingFee =
    tempRequestedProductData.isShippingFree === false
      ? (tempRequestedProductData.productPrice / 10).toFixed(2)
      : 0;

  function changeImage(direction) {
    if (
      direction === "right" &&
      tempRequestedProductData.productImg.length - 1 === imageIndex
    ) {
      setImageIndex(0);
    } else if (
      direction === "right" &&
      tempRequestedProductData.productImg.length - 1 > imageIndex
    ) {
      setImageIndex(imageIndex + 1);
    } else if (direction === "left" && imageIndex !== 0) {
      setImageIndex(imageIndex - 1);
    } else if (direction === "left" && imageIndex === 0) {
      setImageIndex(tempRequestedProductData.productImg.length - 1);
    }
  }

  return (
    <div className="flex justify-around">
      <div className="relative w-[30%] mb-10 flex items-center justify-center">
        {/* Left Button */}
        <button
          onClick={() => changeImage("left")}
          className="z-10 absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white p-2 rounded-full hover:bg-gray-400 hover:text-black"
        >
          &lt;
        </button>

        {/* Image */}
        <Image
          src={tempRequestedProductData.productImg[imageIndex]}
          alt={tempRequestedProductData.productName}
          className="max-h-[700px] border border-black object-cover rounded-xl"
          width={600}
        />

        {/* Right Button */}
        <button
          onClick={() => changeImage("right")}
          className="z-10 absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white p-2 rounded-full hover:bg-gray-400 hover:text-black"
        >
          &gt;
        </button>
      </div>

      <div className="w-[50%] my-auto">
        <p className="border border-black p-1 bg-slate-200">
          {tempRequestedProductData.isShippingFree ? (
            <span className="text-green-500 p-1">
              ✔ <span className="text-black">Includes free shipping</span>
            </span>
          ) : (
            <span>
              {" "}
              Shipping fee: {shippingFee}💲
              <span>
                {" "}
                (
                <span className="text-red-500 p-1">
                  ❌{" "}
                  <span className="text-black font-semibold">
                    Does not include free shipping
                  </span>
                </span>
                )
              </span>
            </span>
          )}
        </p>
        <div className="border border-black my-2 p-2 bg-slate-200">
          <div className="border border-black p-2 text-xl w-full">
            <span className="flex flex-col w-full break-words hyphens-auto">
              {tempRequestedProductData.productName}
            </span>
            <p className="text-xl">
              {tempRequestedProductData.productRating}⭐
            </p>
          </div>
          <p className="border border-black my-2 p-2">
            Description: {tempRequestedProductData.productDescription}
          </p>
          <p className="p-2">Select a size:</p>
          <ul className="flex justify-between w-[40%] border border-black rounded-xl px-3 py-2 ">
            {tempRequestedProductData.productOptions.map((option) => (
              <li
                key={option}
                className={`hover:scale-110 hover:underline duration-150 cursor-pointer p-1 relative box-border ${
                  option === selectedOption
                    ? "border-2 border-orange-500 rounded-full bg-orange-300 text-black shadow-lg"
                    : "text-gray-600"
                }`}
                onClick={() => setSelectedOption(option)}
              >
                {option}
              </li>
            ))}
          </ul>
          <div className="m-2 p-2 w-1/3">
            <p className="text-2xl">
              {tempRequestedProductData.productPrice}💲
            </p>
            <button className="border border-black rounded-md bg-orange-300 p-2 w-14 mt-2 hover:bg-orange-400 hover:text-white hover:scale-110 duration-100">
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
