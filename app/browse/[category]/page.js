import BrowseProductsPage from "@/app/_components/_products/BrowseProductsPage";
import { getProducts } from "@/app/_lib/_api/productServices";
import { Suspense } from "react";

// export const metadata = {
//   title: "ass"
// }

async function Page({ params }) {
  const data = await getProducts();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <BrowseProductsPage
        products={data}
        showAll={true}
        category={params.category}
      />
    </Suspense>
  );
}
export default Page;
