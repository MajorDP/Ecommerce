"use client";
import { getUserPreferences } from "@/app/_lib/_api/productServices";
import PaginatedProductList from "./PaginatedProductList";
import ScrollableProductList from "./ScrollableProductList";
import { Suspense, useEffect, useState } from "react";
import Spinner from "../Spinner";

function PersonalizedProducts({ productsData, userId, showAll = true }) {
  // Fetch preferences server-side

  const [userPrefs, setUserPrefs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log(userPrefs);
  console.log(productsData);

  useEffect(
    function () {
      async function getPrefs() {
        const userPreferences = await getUserPreferences(userId);
        setUserPrefs(userPreferences);
        setIsLoading(false);
      }
      getPrefs();
    },
    [userId]
  );

  if (isLoading) return <Spinner />;

  //filtering products based on users preferences => if the user has opened/ordered/searched products with certain categories/price ranges names
  const filteredProducts =
    userPrefs.categoryPrefs.length === 0 && userPrefs.searchPrefs === 0
      ? productsData
      : productsData.filter(
          (product) =>
            product.productCategories.some((category) =>
              userPrefs.categoryPrefs.some((pref) => pref.name === category)
            ) ||
            product.productPrice <= userPrefs.priceRangePrefs[0]?.to ||
            userPrefs.searchPrefs.some((pref) =>
              product.productName
                .toLowerCase()
                .includes(pref.value.toLowerCase())
            )
        );

  console.log(filteredProducts);
  return (
    <div className="relative">
      {showAll === false ? (
        <ScrollableProductList
          products={filteredProducts}
          userPreferences={userPrefs}
        />
      ) : (
        <PaginatedProductList
          products={filteredProducts}
          userPreferences={userPrefs}
        />
      )}
    </div>
  );
}

export default PersonalizedProducts;
