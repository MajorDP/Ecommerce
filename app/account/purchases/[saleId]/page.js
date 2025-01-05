import CurrentSale from "@/app/_components/CurrentSale";
import OrderNotFound from "@/app/_components/_account/OrderNotFound";
import { getUserPurchase } from "@/app/_lib/_api/userServices";
import { Suspense } from "react";

export const fetchCache = "force-no-store";
async function page({ params }) {
  const currentSale = await getUserPurchase(params.saleId);

  if (!currentSale) {
    return <OrderNotFound />;
  }
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <CurrentSale sale={currentSale} />
    </Suspense>
  );
}

export default page;
