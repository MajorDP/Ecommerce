"use client";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("../_map/Map"), { ssr: false });
//lazy loading for map component, as it needs the browser in order to work (cant be rendered on the server)

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import OrderForm from "./OrderForm";
import { clearCart, initCart } from "../../_lib/_api/cart";
import CartDetailsMini from "./CartDetailsMini";
import { getCurrentUser } from "../../_lib/_api/userServices";
import { submitOrder } from "../../_lib/_api/productServices";
import toast from "react-hot-toast";
import ToastMessage from "../ToastMessage";
import { useRouter } from "next/navigation";

function OrderSteps() {
  const searchParams = useSearchParams();
  const router = useRouter();
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

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = await getCurrentUser();

    const order = {
      created_at: new Date(),
      orderedBy: user.user.id,
      items: cart,
      mapLocation: [{ lat: lat, lng: lng }],
      orderDetails: [
        {
          fullName: formData.get("fullName"),
          email: formData.get("email"),
          physicalAddress: formData.get("physicalAddress"),
          postalCode: formData.get("postalCode"),
          phone: formData.get("phone"),
          wayOfPayment: formData.get("wayOfPayment"),
        },
      ],
      totalPrice: cart.reduce((acc, item) => {
        const currItemPrice =
          item.discountedPrice !== null
            ? item.discountedPrice * item.quantity + item.shippingFee
            : item.productPrice * quantity + item.shippingFee;

        return acc + currItemPrice;
      }, 0),
      productsCount: cart.reduce((acc, curr) => {
        return acc + curr.quantity;
      }, 0),
    };

    const data = await submitOrder(order);

    if (data.id) {
      toast.success(<ToastMessage message={"Order placed successfully!"} />, {
        duration: 5000,
      });
      clearCart();
      router.replace(`/account/cart/checkout/success/${data.id}`);
    }
  }
  return (
    <>
      <div className="flex items-center justify-center flex-col mb-10 sm:mb-4 h-[20%]">
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
          } disabled:bg-gray-400 p-2 text-center mt-2 mb-2 sm:mb-0 w-[100%] md:w-[20%] sm:w-[10%] border-2 border-black rounded-full text-black font-semibold hover:scale-105 transition-all duration-300 ease-in-out`}
        >
          {step === 2 ? "Previous" : "Next"}
        </button>
      </div>
      <div className="border-t border-black h-[80%] sm:h-full">
        {step === 1 ? (
          <Map setLat={setLat} setLng={setLng} />
        ) : (
          <div className="bg-gray-50 flex flex-col sm:flex-row h-[92%] sm:h-full overflow-scroll sm:overflow-hidden justify-between">
            <OrderForm handleSubmit={handleSubmit} />
            <CartDetailsMini />
          </div>
        )}
      </div>
    </>
  );
}

export default OrderSteps;
