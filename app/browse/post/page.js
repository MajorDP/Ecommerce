"use client";
import CreateEditProductForm from "@/app/_components/CreateEditProductForm";
import { postProduct } from "@/app/_lib/_api/productServices";
import Link from "next/link";

function Page() {
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const productObj = {
      productName: formData.get("productName"),
      productPrice: formData.get("productPrice"),
      productDesc: formData.get("productDescription"),
      productImg: formData.get("productImg"),
    };

    await postProduct(productObj);
  }

  return (
    <div className="rounded-3xl p-6 bg-slate-300 w-[90%] m-auto">
      <p className="p-4 border-2 border-slate-400 rounded-3xl w-[50%] m-auto mt-6 mb-12 text-center text-xl font-medium shadow-md">
        List a product
      </p>
      <CreateEditProductForm handleSubmit={handleSubmit} />
    </div>
  );
}

export default Page;
