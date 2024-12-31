"use client";
import UserProductCard from "@/app/_components/_products/UserProductCard";
import { getCurrentUser, getUserProducts } from "@/app/_lib/_api/userServices";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";

function Page() {
  const [userProducts, setUserProducts] = useState(null);
  useEffect(function (param) {
    async function getUser() {
      const data = await getCurrentUser();

      const productData = await getUserProducts(data.user.id);
      setUserProducts(productData);
    }
    getUser();
  }, []);
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <p className="p-4 bg-gradient-to-r from-slate-500 via-blue-400 to-slate-500 border border-black text-white w-[90%] sm:w-[50%] rounded-3xl m-auto mt-6 text-center text-sm sm:text-2xl font-semibold shadow-lg">
        Your purchase history
      </p>

      <div className="bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 w-[90%] sm:w-[95%] h-[70vh] sm:h-[80%] m-4 sm:m-12 border border-gray-300 rounded-xl overflow-y-scroll overflow-x-hidden shadow-lg scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-500">
        <ul className="space-y-4">
          {userProducts &&
            userProducts.map((product, index) => (
              <UserProductCard product={product} key={index} />
            ))}
          {userProducts?.length === 0 && (
            <div className="flex flex-col items-center mt-10">
              <p className="text-center text-lg text-gray-700 font-medium">
                You haven&apos;t listed any products yet.
              </p>
              <Link
                className="p-2 mt-4 border-2 border-black rounded-full bg-lime-400 text-black font-semibold hover:bg-lime-500 hover:scale-105 transition-all duration-300 ease-in-out"
                href="/browse/post"
              >
                List a product
              </Link>
            </div>
          )}
        </ul>
      </div>
    </Suspense>
  );
}

export default Page;
