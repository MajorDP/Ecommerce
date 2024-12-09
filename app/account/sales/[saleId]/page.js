import CurrentSale from "@/app/_components/CurrentSale";
import SaleCard from "@/app/_components/SaleCard";
import { getUserSale } from "@/app/_lib/_api/userServices";
import { Suspense } from "react";

export const fetchCache = "force-no-store";
async function page({ params }) {
  const currentSale = await getUserSale(0, params.saleId);
  console.log(params);
  console.log(currentSale);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <CurrentSale sale={currentSale} />
    </Suspense>
  );
}

export default page;
