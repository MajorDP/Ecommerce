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
      <div className="flex justify-around">
        <ProductImgSlider product={product} />

        <div className="w-[50%] my-auto">
          <p className="border border-black p-1 bg-slate-200">
            {product.shippingFee === null ? (
              <span className="text-green-500 p-1">
                ✔ <span className="text-black">Includes free shipping</span>
              </span>
            ) : (
              <span>
                {" "}
                Shipping fee: {product.shippingFee}💲
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
                {product.productName}
              </span>
              <ProductRatingSetter product={product} />
            </div>
            {product.productDesc && (
              <p className="border border-black my-2 p-2">
                Description: {product.productDesc}
              </p>
            )}
            <TypeSelector product={product} productOptions={product.options} />
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default Page;
