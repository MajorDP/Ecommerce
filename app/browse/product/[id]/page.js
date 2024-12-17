import ButtonActions from "@/app/_components/_buttons/ButtonActions";
import ProductRatingSetter from "@/app/_components/_products/ProductRatingSetter";
import ProductImgSlider from "@/app/_components/ProductImgSlider";
import SizeSelector from "@/app/_components/SizeSelector";
import { getProduct } from "@/app/_lib/_api/productServices";
import muay1 from "@/public/muay1.png";
import muay2 from "@/public/muay2.png";
import Image from "next/image";
import { Suspense } from "react";

export const fetchCache = "force-no-store";
async function Page({ params }) {
  const product = await getProduct(params.id);
  console.log(product);
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

  const shippingFee =
    tempRequestedProductData.isShippingFree === false
      ? (tempRequestedProductData.productPrice / 10).toFixed(2)
      : 0;

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="flex justify-around">
        <ProductImgSlider product={product} />

        <div className="w-[50%] my-auto">
          <p className="border border-black p-1 bg-slate-200">
            {tempRequestedProductData.isShippingFree ? (
              <span className="text-green-500 p-1">
                ✔ <span className="text-black">Includes free shipping</span>
              </span>
            ) : (
              <span>
                {" "}
                Shipping fee: {shippingFee}💲
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
            <p className="border border-black my-2 p-2">
              Description: {product.productDesc}
            </p>
            <SizeSelector />
            <div className="m-2 p-2 w-1/3">
              <p className="text-2xl">{product.productPrice}💲</p>
              <ButtonActions
                listedBy={product.listedBy}
                productId={product.id}
                product={product}
              />
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default Page;
