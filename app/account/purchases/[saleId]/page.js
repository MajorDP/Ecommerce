import CurrentSale from "@/app/_components/CurrentSale";
import { getUserPurchase } from "@/app/_lib/_api/userServices";
import { Suspense } from "react";

export const fetchCache = "force-no-store";
async function page({ params }) {
  const currentSale = await getUserPurchase(0, params.saleId);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <CurrentSale sale={currentSale} />
    </Suspense>
  );
}

export default page;
