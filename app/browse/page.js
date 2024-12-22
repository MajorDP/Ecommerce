import { getProducts } from "../_lib/_api/productServices";
import BrowseProductsPage from "../_components/_products/BrowseProductsPage";
import { Suspense } from "react";

// export const metadata = {
//   title: "ass"
// }

export const fetchCache = "force-no-store";
async function Page() {
  const data = await getProducts();

  return (
    <Suspense fallback={<p>Loading items...</p>}>
      <BrowseProductsPage products={data} showAll={false} />
    </Suspense>
  );
}

export default Page;
