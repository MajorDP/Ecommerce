"use client";
import { useState } from "react";
import muay1 from "@/public/muay1.png";
import muay2 from "@/public/muay2.png";
import ButtonActions from "./_buttons/ButtonActions";

function TypeSelector({ product, productOptions }) {
  console.log(productOptions);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quantity, setQuantity] = useState(1);
  console.log(quantity);
  return (
    <>
      <div className="flex flex-col gap-2 mt-4">
        <div>
          <label htmlFor="quantity" className="text-gray-700 font-medium">
            Select quantity:
          </label>
          <input
            type="number"
            min="1"
            max={product.availableQuantity}
            value={quantity} // Controlled by the `quantity` state
            onChange={(e) => {
              const value = Math.min(
                Math.max(1, parseInt(e.target.value || "1", 10)),
                product.availableQuantity
              );
              setQuantity(value); // Update state dynamically
            }}
            className="w-20 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <p className="text-sm text-gray-500">
          Avaliable quantity: {product.availableQuantity}
        </p>
      </div>

      {product.options.length > 0 && (
        <div>
          <p className="p-2">Select a type:</p>
          <ul className="flex justify-between w-[60%] border border-black rounded-xl px-3 py-2 ">
            {productOptions.map((option, index) => (
              <li
                key={index}
                className={`hover:scale-110 hover:underline duration-150 cursor-pointer p-1 relative box-border ${
                  option.type === selectedOption?.type
                    ? "border-2 border-orange-500 rounded-xl bg-orange-300 text-black"
                    : "text-gray-600"
                }`}
                onClick={() => setSelectedOption(option)}
              >
                <p className="text-center">{option.type}</p>
                <img
                  src={option.img}
                  alt=""
                  className="w-[100px] h-[100px] border border-black rounded-md"
                />
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="m-2 p-2 w-1/3">
        <p className="text-2xl">{product.productPrice}💲</p>
        <ButtonActions
          selectedOption={selectedOption}
          quantity={quantity}
          listedBy={product.listedBy}
          productId={product.id}
          product={product}
        />
      </div>
    </>
  );
}

export default TypeSelector;
