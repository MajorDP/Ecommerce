"use client";
import SaleCard from "@/app/_components/SaleCard";
import {
  getCurrentUser,
  getUserPurchases,
  getUserSalesInfo,
} from "@/app/_lib/_api/userServices";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";

//nextjs caches urls, this prevents it
export const fetchCache = "force-no-store";

function Page() {
  const [userSalesData, setUserSalesData] = useState(null);
  console.log(userSalesData);
  useEffect(function () {
    async function getSales() {
      const user = await getCurrentUser();
      const userSalesInfo = await getUserPurchases(user.user.id);
      setUserSalesData(userSalesInfo);
    }
    getSales();
  }, []);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <p className="p-4 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 border border-black text-white w-[50%] rounded-3xl m-auto mt-6 text-center text-2xl font-semibold shadow-lg">
        Your purchase history
      </p>

      <div className="bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 w-[95%] h-[80%] m-12 border rounded-xl overflow-y-scroll overflow-x-hidden shadow-lg scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 hover:scrollbar-thumb-gray-500">
        <ul className="space-y-4">
          {" "}
          {userSalesData?.map((purchase, index) => (
            <SaleCard sale={purchase} key={index} type="purchases" />
          ))}
          {userSalesData?.items?.length === 0 && (
            <div className="flex flex-col items-center mt-10">
              <p className="text-center text-lg text-gray-700 font-medium">
                You haven&apos;t made any purchases yet.
              </p>
              <Link
                className="p-2 mt-4 border-2 border-black rounded-full bg-orange-400 text-black font-semibold hover:bg-orange-500 hover:scale-105 transition-all duration-300 ease-in-out"
                href="/browse"
              >
                See available products
              </Link>
            </div>
          )}
        </ul>
      </div>
    </Suspense>
  );
}

export default Page;
