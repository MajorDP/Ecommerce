"use client";

import { useState } from "react";

function ProductImgSlider({ product }) {
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
    <div className="relative lg:m-0 m-auto w-full sm:w-[50%] md:w-[40%] lg:w-[30%] mb-10 flex items-center justify-center">
      {product.productImg.length > 1 && (
        <button
          onClick={() => changeImage("left")}
          className="z-10 absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white p-2 rounded-full hover:bg-gray-400 hover:text-black"
        >
          &lt;
        </button>
      )}

      <img
        src={product.productImg[imageIndex]}
        alt={product.productName}
        className="border border-black p-1 max-h-[700px] w-auto object-cover rounded-xl"
      />

      {product.productImg.length > 1 && (
        <button
          onClick={() => changeImage("right")}
          className="z-10 absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white p-2 rounded-full hover:bg-gray-400 hover:text-black"
        >
          &gt;
        </button>
      )}
    </div>
  );
}

export default ProductImgSlider;
