"use client";
import { getCurrentUser, getUserPurchases } from "@/app/_lib/_api/userServices";
import { useEffect, useState } from "react";
import SaleCard from "../SaleCard";
import Link from "next/link";
import Spinner from "../Spinner";

//nextjs caches urls, this prevents it
export const fetchCache = "force-no-store";

function UserPurchasesList() {
  const [userSalesData, setUserSalesData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function () {
    async function getPurchases() {
      const user = await getCurrentUser();
      const userSalesInfo = await getUserPurchases(user.user.id);
      setUserSalesData(userSalesInfo);
      setIsLoading(false);
    }
    getPurchases();
  }, []);

  if (isLoading) return <Spinner />;
  return (
    <div className="g-gradient-to-r from-gray-50 via-gray-100 to-gray-200  w-[90%] sm:w-[90%] h-[60vh] sm:h-[70vh] m-6 sm:m-12 border rounded-xl overflow-y-scroll overflow-x-hidden shadow-lg scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 hover:scrollbar-thumb-gray-500">
      <ul className="space-y-4">
        {userSalesData?.map((purchase, index) => (
          <SaleCard sale={purchase} key={index} type="purchases" />
        ))}
        {userSalesData?.length === 0 && (
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
  );
}

export default UserPurchasesList;
