"use client";

import Link from "next/link";
import { useState } from "react";
import { editProduct, postProduct } from "../_lib/_api/productServices";

function CreateEditProductForm({ product = null }) {
  const [image, setImage] = useState(
    product !== null ? product?.productImg[0] : null
  );

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const productObj = {
      productName: formData.get("productName"),
      productPrice: formData.get("productPrice"),
      productDesc: formData.get("productDescription"),
      productImg: [
        typeof image === "string" ? image : formData.get("productImg"),
      ],
    };
    product === null
      ? await postProduct(productObj)
      : await editProduct(productObj, product?.id);
  }
  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
      <div className="flex flex-row justify-between w-[80%] gap-8">
        <div className="flex flex-col text-lg w-[50%] pl-10">
          <div className="flex flex-col mb-6">
            <label htmlFor="name" className="mb-2 text-slate-700 font-medium">
              Name
            </label>
            <input
              name="productName"
              type="text"
              defaultValue={product?.productName || ""}
              placeholder="Tennis racket..."
              className="border border-slate-400 rounded-md px-4 py-2 shadow-sm focus:ring-2 focus:ring-slate-500 focus:outline-none transition w-fit"
            />
          </div>
          <div className="flex flex-col mb-6">
            <label htmlFor="price" className="mb-2 text-slate-700 font-medium">
              Price
            </label>
            <input
              id="price"
              name="productPrice"
              type="number"
              defaultValue={product?.productPrice || ""}
              placeholder="22.00$..."
              className="border border-slate-400 rounded-md px-4 py-2 shadow-sm focus:ring-2 focus:ring-slate-500 focus:outline-none transition w-fit"
            />
          </div>
          <div className="flex flex-col mb-6">
            <label htmlFor="desc" className="mb-2 text-slate-700 font-medium">
              Description
            </label>
            <textarea
              id="desc"
              name="productDescription"
              defaultValue={product?.productDesc || ""}
              placeholder="A detailed description of your product..."
              className="border border-slate-400 rounded-md px-4 py-2 shadow-sm w-full focus:ring-2 focus:ring-slate-500 focus:outline-none transition"
            />
          </div>
        </div>
        <div className="w-[50%] flex flex-col items-center">
          {image === null ? (
            <label
              htmlFor="productImg"
              className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-slate-400 rounded-lg p-10 shadow-sm bg-slate-100 cursor-pointer"
            >
              <span className="text-slate-500 text-center">
                Click here to upload image
              </span>
              <input
                id="productImg"
                name="productImg"
                type="file"
                defaultValue={image || ""}
                accept="image/*"
                onChange={(e) => {
                  setImage(
                    e.target.files[0].type &&
                      e.target.files[0]?.type.startsWith("image/")
                      ? e.target.files[0]
                      : null
                  );
                }}
                className="hidden"
              />
            </label>
          ) : (
            <label
              htmlFor="productImg"
              className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-slate-400 rounded-lg p-10 shadow-sm bg-slate-100 cursor-pointer"
            >
              <img
                src={
                  typeof image === "string" ? image : URL.createObjectURL(image)
                }
                alt="Please choose a valid image."
                className="max-h-[300px] max-w-[400px] object-contain mb-4 rounded-md"
              />
              <input
                id="productImg"
                name="productImg"
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file && file.type.startsWith("image/")) {
                    setImage(file);
                  } else {
                    setImage(null);
                    alert("Please upload a valid image file.");
                  }
                }}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>
      <div className="flex flex-row w-[20%] justify-between ">
        <Link
          href={product === null ? "/browse" : `/browse/product/${product.id}`}
          className="border mt-8 p-2 border-black rounded-xl bg-red-400 text-black text-xl font-semibold hover:bg-red-500 transition-all duration-300 ease-in-out"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="border mt-8 p-2 border-black rounded-xl bg-green-400 text-black text-xl font-semibold hover:bg-green-500 transition-all duration-300 ease-in-out"
        >
          {product === null ? "List product" : "Edit product"}
        </button>
      </div>
    </form>
  );
}

export default CreateEditProductForm;
