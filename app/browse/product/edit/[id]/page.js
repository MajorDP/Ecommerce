import CreateEditProductForm from "@/app/_components/CreateEditProductForm";
import { editProduct, getProduct } from "@/app/_lib/_api/productServices";
import { Suspense } from "react";

export const fetchCache = "force-no-store";
async function Page({ params }) {
  const product = await getProduct(params.id);
  console.log(product);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="rounded-3xl p-6 bg-slate-300 w-[90%] m-auto">
        <p className="p-4 border-2 border-slate-400 rounded-3xl w-[50%] m-auto mt-6 mb-12 text-center text-xl font-medium shadow-md">
          Edit product#{product.id}
        </p>
        <CreateEditProductForm product={product} />
      </div>
    </Suspense>
  );
}

export default Page;
