"use client";
import { useState } from "react";
import muay1 from "@/public/muay1.png";
import muay2 from "@/public/muay2.png";

function SizeSelector() {
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
  return (
    <>
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
    </>
  );
}

export default SizeSelector;
