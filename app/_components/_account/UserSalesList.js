"use client";

import { getCurrentUser, getUserSales } from "@/app/_lib/_api/userServices";
import { useEffect, useState } from "react";
import SaleCard from "../SaleCard";
import Link from "next/link";
import Spinner from "../Spinner";

//nextjs caches urls, this prevents it
export const fetchCache = "force-no-store";

function UserSalesList() {
  const [userSalesData, setUserSalesData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(function () {
    async function getSales() {
      const user = await getCurrentUser();
      const userSalesInfo = await getUserSales(user.user.id);
      setUserSalesData(userSalesInfo);
      setIsLoading(false);
    }
    getSales();
  }, []);

  if (isLoading) return <Spinner />;
  return (
    <div className="g-gradient-to-r from-gray-50 via-gray-100 to-gray-200 w-[90%] m-auto sm:w-[95%] lg:w-[95%] sm:h-[30%] lg:h-[80%] sm:m-6 mt-2 sm:mt-0 border rounded-xl overflow-y-scroll overflow-x-hidden shadow-lg scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 hover:scrollbar-thumb-gray-500">
      <ul className="space-y-4">
        {userSalesData?.map((sale, index) => (
          <SaleCard sale={sale} key={index} type="sales" />
        ))}
        {userSalesData?.length === 0 && (
          <div className="flex flex-col items-center mt-10">
            <p className="text-center text-lg text-gray-700 font-medium">
              You don&apos;t have any sales yet.
            </p>
            <Link
              className="p-2 mt-4 border-2 border-black rounded-full bg-orange-400 text-black font-semibold hover:bg-orange-500 hover:scale-105 transition-all duration-300 ease-in-out"
              href="/browse"
            >
              See my products
            </Link>
            <p className="mt-4 text-lg text-gray-600">or</p>

            <Link
              className="p-2 mt-4 border-2 border-black rounded-full bg-green-400 text-black font-semibold hover:bg-green-500 hover:scale-105 transition-all duration-300 ease-in-out"
              href="/browse/post"
            >
              List a product
            </Link>
          </div>
        )}
      </ul>
    </div>
  );
}

export default UserSalesList;
