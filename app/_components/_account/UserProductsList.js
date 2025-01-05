"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getCurrentUser, getUserProducts } from "@/app/_lib/_api/userServices";
import UserProductCard from "../_products/UserProductCard";
import Spinner from "../Spinner";

//nextjs caches urls, this prevents it
export const fetchCache = "force-no-store";

function UserProductsList() {
  const [userProducts, setUserProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(function () {
    async function getProducts() {
      const data = await getCurrentUser();

      const productData = await getUserProducts(data.user.id);
      setUserProducts(productData);
      setIsLoading(false);
    }
    getProducts();
  }, []);

  if (isLoading) return <Spinner />;
  return (
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
  );
}

export default UserProductsList;
