import ButtonActions from "@/app/_components/_buttons/ButtonActions";
import ProductRatingSetter from "@/app/_components/_products/ProductRatingSetter";
import ProductImgSlider from "@/app/_components/ProductImgSlider";
import TypeSelector from "@/app/_components/TypeSelector";
import { getProduct } from "@/app/_lib/_api/productServices";
import muay1 from "@/public/muay1.png";
import muay2 from "@/public/muay2.png";
import Image from "next/image";
import { Suspense } from "react";

export const fetchCache = "force-no-store";
async function Page({ params }) {
  const product = await getProduct(params.id);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="flex flex-col lg:flex-row justify-around px-4">
        {/* Product Image Slider */}
        <ProductImgSlider product={product} />

        {/* Product Info Section */}
        <div className="w-full lg:w-1/2 my-auto space-y-4">
          {/* Shipping Fee */}
          <p className="border border-black p-3 bg-slate-100 rounded-lg text-sm">
            {product.shippingFee === null ? (
              <span className="text-green-500 font-semibold">
                ✔ <span className="text-black">Includes free shipping</span>
              </span>
            ) : (
              <span>
                Shipping fee: {product.shippingFee} 💲{" "}
                <span className="text-red-500 font-semibold">
                  ❌ Does not include free shipping
                </span>
              </span>
            )}
          </p>

          {/* Product Info Section */}
          <div className="border border-black p-4 bg-slate-100 rounded-lg space-y-4">
            <div className="pb-2">
              <span className="text-xl font-semibold text-black break-words hyphens-auto block">
                {product.productName}
              </span>
              <ProductRatingSetter product={product} />
            </div>

            {/* Description */}
            {product.productDesc && (
              <p className="text-sm border-t border-black pt-2">
                <span className="font-semibold">Description:</span>{" "}
                {product.productDesc}
              </p>
            )}

            {/* Type Selector */}
            <TypeSelector product={product} productOptions={product.options} />
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default Page;
