import BrowseProductsPage from "@/app/_components/_products/BrowseProductsPage";
import { getProducts } from "@/app/_lib/_api/productServices";

// export const metadata = {
//   title: "ass"
// }

async function Page({ params }) {
  const data = await getProducts();

  return (
    <BrowseProductsPage
      products={data}
      showAll={true}
      category={params.category}
    />
  );
}
export default Page;
