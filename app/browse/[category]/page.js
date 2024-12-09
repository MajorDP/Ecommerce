import BrowseProductsPage from "@/app/_components/BrowseProductsPage";
import { getProducts } from "@/app/_lib/_api/productServices";

// export const metadata = {
//   title: "ass"
// }

async function Page({ params }) {
  console.log(params);
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
