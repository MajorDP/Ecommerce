import ProductRatingSetter from "@/app/_components/_products/ProductRatingSetter";
import ProductImgSlider from "@/app/_components/ProductImgSlider";
import Spinner from "@/app/_components/Spinner";
import TypeSelector from "@/app/_components/TypeSelector";
import { getProduct } from "@/app/_lib/_api/productServices";
import { formatDate } from "@/app/_lib/helpers";
import { Suspense } from "react";

export const fetchCache = "force-no-store";

export async function generateMetadata({ params }) {
  const product = await getProduct(params.id);

  return {
    title: product?.productName ? `${product.productName}` : "Product Page",
    description: product?.productDesc || "Check out our amazing products",
  };
}

async function Page({ params }) {
  const product = await getProduct(params.id);

  return (
    <Suspense fallback={<Spinner />}>
      <div className="flex flex-col lg:flex-row justify-around px-4">
        <ProductImgSlider product={product} />
        <div className="w-full lg:w-1/2 my-auto space-y-4">
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

          <div className="border border-black p-4 bg-slate-100 rounded-lg space-y-4">
            <div className="pb-2">
              <span className="text-xl font-semibold text-black break-words hyphens-auto block">
                {product.productName}
              </span>
              <p className="text-xs">
                Last edited: {formatDate(product.created_at)}
              </p>
              <ProductRatingSetter product={product} />
            </div>

            {product.productDesc && (
              <p className="text-sm border-t border-black pt-2">
                <span className="font-semibold">Description:</span>{" "}
                {product.productDesc}
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
