import { getCategories, getProducts } from "../_lib/_api/productServices";
import BrowseProductsPage from "../_components/_products/BrowseProductsPage";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata = {
  title: "Browse",
  description:
    "Browse all kinds of products ranging from everyday appliances to uncommon solutions to problems",
};

export const fetchCache = "force-no-store";
async function Page() {
  const data = await getProducts();
  const categories = await getCategories();

  return (
    <Suspense>
      <div className="rounded-3xl p-4 bg-slate-300 flex flex-col items-center w-[90%] m-auto ">
        <BrowseProductsPage products={data} categories={categories} />
      </div>
    </Suspense>
  );
}

export default Page;
