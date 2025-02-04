"use client";
import { useEffect, useState } from "react";
import { getUserInfo } from "../_lib/_api/userServices";
import ButtonActions from "./_buttons/ButtonActions";

function TypeSelector({ product, productOptions }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [user, setUser] = useState(null);

  useEffect(function () {
    async function getUser() {
      const user = await getUserInfo();
      setUser(user);
    }
    getUser();
  }, []);
  return (
    <>
      <div className="flex flex-col gap-4 mt-4">
        {user?.userId !== product.listedBy && (
          <div>
            <label htmlFor="quantity" className="text-gray-700 font-medium">
              Select quantity:
            </label>
            <input
              type="number"
              min="1"
              max={product.availableQuantity}
              value={quantity}
              onChange={(e) => {
                const value = Math.min(
                  Math.max(1, parseInt(e.target.value || "1", 10)),
                  product.availableQuantity
                );
                setQuantity(value);
              }}
              className="w-20 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )}

        <p className="text-sm text-gray-500">
          Available quantity: {product.availableQuantity}
        </p>
      </div>

      {product.options.length > 0 && (
        <div className="mt-4">
          <p className="p-2 text-lg font-medium">Select a type:</p>
          <ul className="flex flex-col lg:flex-row gap-2 overflow-x-hidden p-2">
            {productOptions.map((option, index) => (
              <li
                key={index}
                className={`cursor-pointer p-3 relative rounded-lg border border-gray-300 hover:scale-110 transition-all duration-150 ease-in-out ${
                  option.type === selectedOption?.type
                    ? "border-2 border-orange-500 bg-orange-100 text-black"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setSelectedOption(option)}
              >
                <div className="flex flex-col items-center">
                  <img
                    src={option.img}
                    alt=""
                    className="w-[100px] h-[100px] border border-black rounded-md"
                  />
                  <p className="text-center">{option.type}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="m-2 p-2 w-full sm:w-1/3">
        <p className="text-2xl font-semibold">
          {product.discountedPrice
            ? (
                (product.discountedPrice + product.shippingFee) *
                quantity
              ).toFixed(2) || 0
            : ((product.productPrice + product.shippingFee) * quantity).toFixed(
                2
              )}
          💲
        </p>
        <ButtonActions
          selectedOption={selectedOption}
          quantity={quantity}
          product={product}
        />
      </div>
    </>
  );
}

export default TypeSelector;
