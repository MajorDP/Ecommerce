"use client";

import { useState } from "react";

import muay1 from "@/public/muay1.png";
import muay2 from "@/public/muay2.png";
import Image from "next/image";
function CurrentSale({ sale }) {
  const [imageIndex, setImageIndex] = useState(0);
  console.log(sale);

  const tempItems = [
    { id: 0, name: "Glock", quantity: 1, pricePerUnit: 22.24 },
    { id: 0, name: "Bomb", quantity: 1, pricePerUnit: 22.24 },
  ];
  //CHANGE WHEN IMAGES ARE ADDED INTO DATABASE
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

  function changeImage(direction) {
    console.log("aa");
    if (direction === "right" && tempItems.length - 1 === imageIndex) {
      setImageIndex(0);
    } else if (direction === "right" && tempItems.length - 1 > imageIndex) {
      setImageIndex(imageIndex + 1);
    } else if (direction === "left" && imageIndex !== 0) {
      setImageIndex(imageIndex - 1);
    } else if (direction === "left" && imageIndex === 0) {
      setImageIndex(tempItems.length - 1);
    }
  }
  return (
    <div className="flex justify-around items-center bg-blue-100 border border-black rounded-md w-[90%] m-auto h-[80vh] mt-5">
      <div className="relative  mb-10 flex items-center justify-center">
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
          className="max-h-[600px] border border-black object-cover rounded-xl"
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

      <div className="pt-0 flex flex-col justify-between h-[50%]">
        <div>
          <p className="text-xl">Sale ID: {sale?.orderId}</p>
          <p>Ordered on: {sale?.orderDate}</p>
        </div>
        <div>
          <p>Item: {tempItems[imageIndex].name}</p>
          <p>Quantity ordered: {tempItems[imageIndex].quantity}</p>
          <p>Price per unit: {tempItems[imageIndex].pricePerUnit} 💲</p>
        </div>
        <div>
          <p>Total: {sale?.totalPrice} 💲</p>
        </div>
      </div>
    </div>
  );
}

export default CurrentSale;
