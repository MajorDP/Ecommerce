"use client";
import UserProductCard from "@/app/_components/UserProductCard";
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
      <p className="p-4 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 border border-black text-white w-[50%] rounded-3xl m-auto mt-6 text-center text-2xl font-semibold shadow-lg">
        Your purchase history
      </p>

      <div className="bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 w-[95%] h-[80%] m-12 border rounded-xl overflow-y-scroll overflow-x-hidden shadow-lg scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 hover:scrollbar-thumb-gray-500">
        <ul className="space-y-4">
          {" "}
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
                className="p-2 mt-4 border-2 border-black rounded-full bg-green-400 text-black font-semibold hover:bg-green-500 hover:scale-105 transition-all duration-300 ease-in-out"
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
