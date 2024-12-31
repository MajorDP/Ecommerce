import { getProducts } from "../_lib/_api/productServices";
import BrowseProductsPage from "../_components/_products/BrowseProductsPage";
import { Suspense } from "react";
import Loading from "./loading";

// export const metadata = {
//   title: "ass"
// }

export const fetchCache = "force-no-store";
async function Page() {
  const data = await getProducts();

  return (
    <Suspense>
      <BrowseProductsPage products={data} />
    </Suspense>
  );
}

export default Page;
