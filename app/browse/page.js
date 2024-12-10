import { getProducts } from "../_lib/_api/productServices";
import BrowseProductsPage from "../_components/BrowseProductsPage";

// export const metadata = {
//   title: "ass"
// }

export const fetchCache = "force-no-store";
async function Page() {
  const data = await getProducts();

  return <BrowseProductsPage products={data} showAll={false} />;
}

export default Page;
