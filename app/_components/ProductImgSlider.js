"use client";

import Image from "next/image";
import { useState } from "react";
import muay1 from "@/public/muay1.png";
import muay2 from "@/public/muay2.png";

function ProductImgSlider({ product }) {
  console.log(product);
  const [imageIndex, setImageIndex] = useState(0);

  function changeImage(direction) {
    if (direction === "right" && product.productImg.length - 1 === imageIndex) {
      setImageIndex(0);
    } else if (
      direction === "right" &&
      product.productImg.length - 1 > imageIndex
    ) {
      setImageIndex(imageIndex + 1);
    } else if (direction === "left" && imageIndex !== 0) {
      setImageIndex(imageIndex - 1);
    } else if (direction === "left" && imageIndex === 0) {
      setImageIndex(product.productImg.length - 1);
    }
  }
  return (
    <div className="relative w-[30%] mb-10 flex items-center justify-center">
      {/* Left Button */}
      {product.productImg.length > 1 && (
        <button
          onClick={() => changeImage("left")}
          className="z-10 absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white p-2 rounded-full hover:bg-gray-400 hover:text-black"
        >
          &lt;
        </button>
      )}

      {/* Image */}
      <img
        src={product.productImg[imageIndex]}
        alt={product.productName}
        className="max-h-[700px] border border-black object-cover rounded-xl"
        width={600}
      />

      {/* Right Button */}
      {product.productImg.length > 1 && (
        <button
          onClick={() => changeImage("right")}
          className="z-10 absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white p-2 rounded-full hover:bg-gray-400 hover:text-black"
        >
          &gt;
        </button>
      )}
    </div>
  );
}

export default ProductImgSlider;
