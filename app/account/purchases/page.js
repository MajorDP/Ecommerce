import SaleCard from "@/app/_components/SaleCard";
import {
  getUserPurchases,
  getUserSalesInfo,
} from "@/app/_lib/_api/userServices";
import { Suspense } from "react";

async function page() {
  const userSalesInfo = await getUserPurchases(0);

  console.log(userSalesInfo.sales);
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="bg-blue-100 w-[95%] h-[90%] m-12 border rounded-xl overflow-y-scroll overflow-x-hidden shadow-lg scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 hover:scrollbar-thumb-gray-500">
        <ul>
          {userSalesInfo.purchases.map((sale, index) => (
            <SaleCard sale={sale} key={index} type="pruchases" />
          ))}
        </ul>
      </div>
    </Suspense>
  );
}

export default page;
