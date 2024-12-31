"use client";
import Link from "next/link";
import PopularProducts from "./PopularProducts";
import BrowseProducts from "./BrowseProducts";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NewestProducts from "./NewestProducts";
import ProductBrowser from "./ProductBrowser";
import { getUserInfo } from "@/app/_lib/_api/userServices";
import { useRouter } from "next/navigation";

// export const metadata = {
//   title: "ass"
// }

function BrowseProductsPage({ products, category = null }) {
  const router = useRouter();
  const pathname = usePathname();
  const [searchValue, setSearchValue] = useState("");
  const [user, setUser] = useState(null);
  const searchParams = useSearchParams();

  //if we press the Show all button inside the ProductBrowse component, we get a sortBy search param in the URL (==> sortBy !== null ==> ShowAll = true)
  const showAll = category !== null || searchParams.get("order") !== null;

  useEffect(function () {
    async function getUser() {
      const user = await getUserInfo();
      setUser(user);
    }
    getUser();
  }, []);

  const filteredProducts =
    category !== null
      ? products.filter((product) =>
          product.productCategories?.includes(category)
        )
      : products;

  const filteredProductsBySearch =
    searchValue !== ""
      ? filteredProducts
          .slice()
          .filter((product) =>
            product.productName
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          )
      : filteredProducts;

  const browseDisplay = [
    {
      orderValue: "popular",
      component: (
        <ProductBrowser
          key={0}
          component={
            <PopularProducts
              productsData={filteredProductsBySearch}
              searchValue={searchValue}
              showAll={showAll}
            />
          }
          message={"Current most popular products"}
          type={"popular"}
          showAll={showAll}
        />
      ),
    },
    {
      orderValue: "all",
      component: (
        <ProductBrowser
          key={1}
          component={
            <BrowseProducts
              productsData={filteredProductsBySearch}
              searchValue={searchValue}
              showAll={showAll}
            />
          }
          message={"Browse products"}
          type={"all"}
          showAll={showAll}
        />
      ),
    },
    {
      orderValue: "newest",
      component: (
        <ProductBrowser
          key={2}
          component={
            <NewestProducts
              productsData={filteredProductsBySearch}
              searchValue={searchValue}
              showAll={showAll}
            />
          }
          message={"Newest products"}
          type={"newest"}
          showAll={showAll}
        />
      ),
    },
  ].sort((a, b) => {
    const order = searchParams.get("order");

    if (a.orderValue === order && b.orderValue !== order) {
      return -1;
    }
    if (b.orderValue === order && a.orderValue !== order) {
      return 1; // b comes first
    }
  });

  return (
    <div className="rounded-3xl p-4 bg-slate-300 flex flex-col items-center w-[90%] m-auto ">
      <div className="flex sm:flex-row flex-col items-center">
        <div className="relative w-54 mb-2 sm:mb-0">
          <input
            placeholder="Search for products here..."
            className="w-full border-2 border-black rounded-xl p-1 pl-10 text-sm sm:text-xl"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <div className="absolute left-2 top-4 transform -translate-y-1/3 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              stroke="black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35m2.85-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <div className="cursor-pointer bg-gray-100 shadow-lg group ml-2 p-1 mb-2 sm:mb-0 border border-black rounded-xl">
          <span className="flex items-center cursor-pointer text-sm sm:text-xl">
            Categories
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 m-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
          <div className="z-50 hidden absolute text-md group-hover:flex flex-col bg-white border border-gray-300 rounded-md mt-1 shadow-lg w-40">
            <Link
              href="/browse/home-supplies"
              className="px-4 py-2 hover:bg-gray-200 rounded-t-md"
            >
              Home appliances
            </Link>
            <Link
              href="/browse/workouts"
              className="px-4 py-2 hover:bg-gray-200"
            >
              Workouts
            </Link>
            <Link
              href="/browse/cleaning-supplies"
              className="px-4 py-2 hover:bg-gray-200 rounded-b-md"
            >
              Cleaning supplies
            </Link>
          </div>
        </div>
        {user?.isPartner && (
          <Link
            className="border ml-2 p-1 border-black rounded-xl bg-green-400 text-black text-sm sm:text-xl hover:bg-green-500 transition-all duration-300 ease-in-out"
            href="/browse/post"
          >
            List a product
          </Link>
        )}
      </div>
      {browseDisplay.map((el) => el.component)}
      {/* <PopularProducts
          tempPopularProductsData={tempPopularProductsData}
          searchValue={searchValue}
          />
          <BrowseProducts
          tempProductsData={tempProductsData}
          searchValue={searchValue}
          /> */}
    </div>
  );
}

export default BrowseProductsPage;
