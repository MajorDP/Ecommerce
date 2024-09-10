"use client";
import Link from "next/link";
import PopularProducts from "../_components/PopularProducts";
import BrowseProducts from "../_components/BrowseProducts";
import bg from "@/public/bg-1.jpg";
import logo from "@/public/logo.png";
import { useState } from "react";

// export const metadata = {
//   title: "ass"
// }

function Page() {
  const [searchValue, setSearchValue] = useState("");

  const tempPopularProductsData = [
    {
      id: 1,
      productName: "HIGHEST RATED",
      productPrice: 24.55,
      productImg: logo,
      categories: ["home-supllies"],
      rating: 6,
    },
    {
      id: 2,
      productName: "FOURTH HIGH",
      productPrice: 25.55,
      productImg: logo,
      categories: ["workouts", "hhome-supplies"],
      rating: 5.3,
    },
    {
      id: 3,
      productName: "SECOND HIGH",
      productPrice: 22.55,
      productImg: logo,
      categories: ["workouts", "hhome-supplies"],
      rating: 5.5,
    },
    {
      id: 35,
      productName: "Knife",
      productPrice: 22.55,
      productImg: logo,
      categories: ["home-supplies", "cleaning-supplies"],
      rating: 5.4,
    },
    {
      id: 63,
      productName: "Knife",
      productPrice: 22.55,
      productImg: logo,
      categories: ["home-supplies"],
      rating: 4.5,
    },
    {
      id: 37,
      productName: "Knife",
      productPrice: 22.55,
      productImg: logo,
      categories: ["cleaning-supplies"],
      rating: 4.5,
    },
    {
      id: 563,
      productName: "Knife",
      productPrice: 22.55,
      productImg: logo,
      categories: ["home-supplies"],
      rating: 4.5,
    },
    {
      id: 523523542345,
      productName: "home",
      productPrice: 22.55,
      productImg: logo,
      categories: ["home-supplies"],
      rating: 4.5,
    },
    {
      id: 883,
      productName: "Knife",
      productPrice: 22.55,
      productImg: logo,
      categories: ["cleaning-supplies"],
      rating: 4.5,
    },
  ];

  const tempProductsData = [
    {
      id: 1,
      productName: "Fork",
      productPrice: 24.55,
      productImg: logo,
      categories: ["home-supplies"],
      rating: 4.5,
    },
    {
      id: 2,
      productName: "Spoon",
      productPrice: 25.55,
      productImg: logo,
      categories: ["cleaning-supplies"],
      rating: 4.5,
    },
    {
      id: 436343,
      productName: "Knife",
      productPrice: 22.55,
      productImg: logo,
      categories: ["cleaning-supplies"],
      rating: 4.5,
    },
    {
      id: 4,
      productName: "WORKOUT",
      productPrice: 25.55,
      productImg: logo,
      categories: ["workouts", "home-supplies"],
      rating: 4.5,
    },
    {
      id: 5,
      productName: "Knife",
      productPrice: 22.55,
      productImg: bg,
      categories: ["workouts", "home-supplies"],
      rating: 4.5,
    },
    {
      id: 6,
      productName: "Spoon",
      productPrice: 25.55,
      productImg: bg,
      categories: ["workouts", "hhome-supplies"],
      rating: 4.5,
    },
    {
      id: 7,
      productName: "Knife",
      productPrice: 22.55,
      productImg: logo,
      categories: ["workouts", "home-supplies"],
      rating: 4.5,
    },
    {
      id: 23,
      productName: "Spoon",
      productPrice: 25.55,
      productImg: bg,
      categories: ["workouts", "home-supplies"],
      rating: 4.5,
    },
    {
      id: 35,
      productName: "Knife",
      productPrice: 22.55,
      productImg: logo,
      categories: ["workouts", "home-supplies"],
      rating: 4.5,
    },
    {
      id: 62,
      productName: "Spoon",
      productPrice: 25.55,
      productImg: bg,
      categories: ["home-supplies"],
      rating: 4.5,
    },
    {
      id: 37,
      productName: "Knife",
      productPrice: 22.55,
      productImg: logo,
      categories: ["home-supplies"],
      rating: 4.5,
    },
    {
      id: 1233,
      productName: "Knife",
      productPrice: 22.55,
      productImg: logo,
      categories: ["home-supplies"],
      rating: 4.5,
    },
    {
      id: 53453,
      productName: "Knife",
      productPrice: 22.55,
      productImg: logo,
      categories: ["home-supplies"],
      rating: 4.5,
    },
  ];
  return (
    <div className=" rounded-3xl p-4 bg-slate-300 flex flex-col items-center w-[90%] m-auto ">
      <div className="flex flex-row">
        <div className="relative w-54">
          <input
            placeholder="Search for products here..."
            className="w-full border-2 border-black rounded-xl p-1 pl-10"
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
        <div className="cursor-pointer bg-gray-100 shadow-lg group ml-2 p-1 m-auto border border-black rounded-xl">
          <span className="flex items-center cursor-pointer">
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
      </div>
      <div className="w-full">
        <p className=" p-2 border-2 rounded-3xl w-1/3 m-auto my-5 text-center  text-xl font-medium">
          Current most popular products
        </p>
        <PopularProducts
          tempPopularProductsData={tempPopularProductsData}
          searchValue={searchValue}
        />
      </div>
      <div className="w-full">
        <p className=" p-2 border-2 rounded-3xl m-auto mt-12 text-center text-xl font-medium">
          Browse other products
        </p>
        <BrowseProducts
          tempProductsData={tempProductsData}
          searchValue={searchValue}
        />
      </div>
    </div>
  );
}

export default Page;
