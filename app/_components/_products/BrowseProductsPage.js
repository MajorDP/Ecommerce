"use client";
import Link from "next/link";
import PopularProducts from "./PopularProducts";
import BrowseProducts from "./BrowseProducts";
import { Suspense, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NewestProducts from "./NewestProducts";
import ProductBrowser from "./ProductBrowser";
import { getUserInfo } from "@/app/_lib/_api/userServices";
import { useRouter } from "next/navigation";
import Spinner from "../Spinner";
import PersonalizedProducts from "./PersonalizedProducts";

function BrowseProductsPage({ products, categories }) {
  const [searchValue, setSearchValue] = useState("");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState({
    order: searchParams.get("order"),
    category: searchParams.get("category"),
    sort: searchParams.get("sort"),
  });

  //if we press the Show all button inside the ProductBrowse component, we get an order search param in the URL (==> order !== "null" ==> ShowAll === true)
  const showAll = searchParams.get("order") !== "null";

  useEffect(
    function () {
      setSearchQuery({
        order: searchParams.get("order"),
        category: searchParams.get("category"),
        sort: searchParams.get("sort"),
      });
    },
    [searchParams]
  );

  useEffect(function () {
    async function getUser() {
      const user = await getUserInfo();
      setUser(user);
      setIsLoading(false);
    }
    getUser();
  }, []);

  const filteredProductsByCategory =
    searchQuery.category !== "null"
      ? products.filter((product) =>
          product.productCategories?.includes(searchQuery.category)
        )
      : products;

  const filteredProductsBySearch =
    searchValue !== ""
      ? filteredProductsByCategory
          .slice()
          .filter((product) =>
            product.productName
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          )
      : filteredProductsByCategory;

  const sortedProducts = filteredProductsBySearch.sort((a, b) => {
    if (searchQuery.sort === "Alphabetically-desc") {
      return a.productName.localeCompare(b.productName);
    } else if (searchQuery.sort === "Alphabetically-asc") {
      return b.productName.localeCompare(a.productName);
    } else if (searchQuery.sort === "Price-asc") {
      return a.productPrice - b.productPrice;
    } else if (searchQuery.sort === "Price-desc") {
      return b.productPrice - a.productPrice;
    } else {
      return filteredProductsBySearch;
    }
  });

  const browseDisplay = [
    {
      orderValue: "for-you",
      component: (
        <ProductBrowser
          key={0}
          component={
            <PersonalizedProducts
              productsData={products}
              showAll={showAll}
              userId={user?.userId}
            />
          }
          searchQuery={searchQuery}
          message={"For you"}
          type={"for-you"}
          showAll={showAll}
        />
      ),
    },
    {
      orderValue: "popular",
      component: (
        <ProductBrowser
          key={1}
          component={
            <PopularProducts
              productsData={sortedProducts}
              showAll={showAll}
              userId={user?.userId}
            />
          }
          searchQuery={searchQuery}
          message={"Popular products"}
          type={"popular"}
          showAll={showAll}
        />
      ),
    },
    {
      orderValue: "all",
      component: (
        <ProductBrowser
          key={2}
          component={
            <BrowseProducts
              productsData={sortedProducts}
              showAll={showAll}
              userId={user?.userId}
            />
          }
          searchQuery={searchQuery}
          message={"Other products"}
          type={"all"}
          showAll={showAll}
        />
      ),
    },
    {
      orderValue: "newest",
      component: (
        <ProductBrowser
          key={3}
          component={
            <NewestProducts
              productsData={sortedProducts}
              showAll={showAll}
              userId={user?.userId}
            />
          }
          searchQuery={searchQuery}
          message={"Newest products"}
          type={"newest"}
          showAll={showAll}
        />
      ),
    },
  ].sort((a, b) => {
    const order = searchQuery.order;

    if (a.orderValue === order && b.orderValue !== order) {
      return -1;
    }
    if (b.orderValue === order && a.orderValue !== order) {
      return 1;
    }
  });

  if (isLoading) return <Spinner />;
  return (
    <Suspense fallback={<Spinner />}>
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
            {searchQuery.category !== "null" &&
              ": " + searchQuery.category.replaceAll("-", " ")}
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
              href={`/browse?order=${searchQuery.order}&category=null&sort=${searchQuery.sort}`}
              className="px-4 py-2 hover:bg-gray-200 rounded-t-md"
            >
              All
            </Link>
            {categories.map((category, index) => (
              <Link
                key={index}
                href={`/browse?order=${searchQuery.order}&category=${category.value}&sort=${searchQuery.sort}`}
                className="px-4 py-2 hover:bg-gray-200 rounded-t-md"
              >
                {category.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="cursor-pointer bg-gray-100 shadow-lg group ml-2 p-1 mb-2 sm:mb-0 border border-black rounded-xl">
          <span className="flex items-center cursor-pointer text-sm sm:text-xl">
            Sort
            {searchQuery.sort !== "null" &&
              ": " + searchQuery.sort.split("-")[0]}
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
              href={`/browse?order=${searchQuery.order}&category=${searchQuery.category}&sort=null`}
              className="px-4 py-2 hover:bg-gray-200 rounded-t-md"
            >
              Default
            </Link>
            <Link
              href={`/browse?order=${searchQuery.order}&category=${searchQuery.category}&sort=Alphabetically-desc`}
              className="px-4 py-2 hover:bg-gray-200 rounded-t-md"
            >
              A-Z (Alphabetically)
            </Link>
            <Link
              href={`/browse?order=${searchQuery.order}&category=${searchQuery.category}&sort=Alphabetically-asc`}
              className="px-4 py-2 hover:bg-gray-200"
            >
              Z-A (Alphabetically)
            </Link>
            <Link
              href={`/browse?order=${searchQuery.order}&category=${searchQuery.category}&sort=Price-asc`}
              className="px-4 py-2 hover:bg-gray-200 rounded-b-md"
            >
              Price (Cheapest first)
            </Link>
            <Link
              href={`/browse?order=${searchQuery.order}&category=${searchQuery.category}&sort=Price-desc`}
              className="px-4 py-2 hover:bg-gray-200 rounded-b-md"
            >
              Price (Expensive first)
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
    </Suspense>
  );
}

export default BrowseProductsPage;
