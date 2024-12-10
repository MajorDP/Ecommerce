"use client";
import SaleCard from "@/app/_components/SaleCard";
import { getCurrentUser, getUserSalesInfo } from "@/app/_lib/_api/userServices";
import { Suspense, useEffect, useState } from "react";

//nextjs caches urls, this prevents it
export const fetchCache = "force-no-store";

function Page() {
  const [userSalesData, setUserSalesData] = useState(null);
  useEffect(function () {
    async function getSales() {
      const user = await getCurrentUser();
      const userSalesInfo = await getUserSalesInfo(user.data.user.id);
      setUserSalesData(userSalesInfo);
    }
    getSales();
  }, []);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <p className=" p-2 border-2 border-white w-[50%] rounded-3xl m-auto mt-6 text-center text-xl font-medium">
        Your sales history
      </p>
      <div className="bg-blue-100 w-[95%] h-[90%] m-12 border rounded-xl overflow-y-scroll overflow-x-hidden shadow-lg scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 hover:scrollbar-thumb-gray-500">
        <ul>
          {userSalesData?.sales.map((sale, index) => (
            <SaleCard sale={sale} key={index} type="sales" />
          ))}
        </ul>
      </div>
    </Suspense>
  );
}

export default Page;
