"use client";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("../_components/_map/Map"), { ssr: false });

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import OrderForm from "./OrderForm";
import { initCart } from "../_lib/_api/cart";
import CartDetailsMini from "./CartDetailsMini";

function OrderSteps() {
  const searchParams = useSearchParams();
  const [lat, setLat] = useState(searchParams.get("lat"));
  const [lng, setLng] = useState(searchParams.get("lng"));
  const [step, setStep] = useState(1);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(initCart());
    const latFromParams = searchParams.get("lat");
    const lngFromParams = searchParams.get("lng");
    if (latFromParams && lngFromParams) {
      setLat(latFromParams);
      setLng(lngFromParams);
    }
  }, [searchParams]);

  return (
    <>
      <div className="flex items-center justify-center flex-col mb-2 h-[20%]">
        <p>
          {step === 1
            ? "Step 1: Choose your location"
            : "Step 2: Confirm order information"}
        </p>
        <p className="text-center text-xs text-gray-400">
          DISCLAIMER:{" "}
          {step === 1
            ? "Orders with locations directly outside of Bulgaria&apos;s borders will be rejected!"
            : "We are not responsible for incorrectly typed data/incorrect purchases on your behalf!"}
        </p>
        <button
          onClick={() => {
            if (step === 1) {
              if (lat && lng) {
                setStep(2);
              }
            } else {
              setStep(1);
            }
          }}
          disabled={!lat && !lng}
          className={`${
            step === 1
              ? "bg-green-400 hover:bg-green-500"
              : "bg-red-400 hover:bg-red-500"
          } disabled:bg-gray-400 p-2 text-center mt-2 w-[10%] border-2 border-black rounded-full text-black font-semibold hover:scale-105 transition-all duration-300 ease-in-out`}
        >
          {step === 2 ? "Previous" : "Next"}
        </button>
      </div>
      <div className="border border-black border-l-0 border-r-0 h-full">
        {step === 1 ? (
          <Map setLat={setLat} setLng={setLng} />
        ) : (
          <div className="bg-gray-50 flex flex-row justify-between">
            <OrderForm />
            <CartDetailsMini />
          </div>
        )}
      </div>
    </>
  );
}

export default OrderSteps;
