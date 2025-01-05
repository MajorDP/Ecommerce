"use client";

import { getCurrentUser, getUserInfo } from "@/app/_lib/_api/userServices";
import { useEffect, useState } from "react";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

function OrderForm({ handleSubmit }) {
  const [user, setUser] = useState(null);
  const [value, setValue] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(function () {
    async function getUser() {
      const user = await getCurrentUser();
      const userData = await getUserInfo(user.user.id);
      setUser(userData);
    }

    getUser();
  }, []);

  async function onSubmit(event) {
    setIsLoading(true);
    try {
      await handleSubmit(event);
    } catch (error) {
      console.log(error.message);
      return;
    }
  }
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-center justify-center border-1 border-black p-5 mt-2 text-xl w-full max-w-md lg:overflow-y-scroll lg:h-[83%]"
    >
      <div className="flex flex-col items-center mb-4 w-full sm:w-[20rem] mt-10">
        <label htmlFor="fullName" className="mb-1 text-sm sm:text-base">
          Full Name
        </label>
        <input
          name="fullName"
          id="fullName"
          className="p-2 border rounded w-full sm:w-[20rem]"
          placeholder="Your full name here..."
          required
        />
      </div>

      <div className="flex flex-col items-center mb-4 w-full sm:w-[20rem]">
        <label htmlFor="email" className="mb-1 text-sm sm:text-base">
          Email Address
        </label>
        <input
          name="email"
          id="email"
          defaultValue={user?.email}
          className="p-2 border rounded w-full sm:w-[20rem]"
          placeholder="Your email here..."
          required
        />
      </div>

      <div className="flex flex-col items-center mb-4 w-full sm:w-[20rem]">
        <label htmlFor="physicalAddress" className="mb-1 text-sm sm:text-base">
          Physical Address
        </label>
        <input
          name="physicalAddress"
          id="physicalAddress"
          className="p-2 border rounded w-full sm:w-[20rem]"
          placeholder="Your address here..."
          required
        />
      </div>

      <div className="flex flex-col items-center mb-4 w-full sm:w-[20rem]">
        <label htmlFor="postalCode" className="mb-1 text-sm sm:text-base">
          Your Postal Code
        </label>
        <input
          name="postalCode"
          id="postalCode"
          className="p-2 border rounded w-full sm:w-[20rem]"
          placeholder="Your postal code here..."
          required
        />
      </div>

      <div className="flex flex-col justify-center items-center mb-4 w-full sm:w-[20rem] p-1 rounded">
        <label htmlFor="phone" className="mb-1 text-sm sm:text-base">
          Phone Number
        </label>
        <PhoneInput
          countries={["BG"]}
          defaultCountry="BG"
          value={value}
          onChange={setValue}
          name="phone"
          id="phone"
          className="w-full sm:w-[20rem] border rounded p-2"
        />
      </div>

      <div className="flex flex-col items-center mb-4 w-full sm:w-[20rem]">
        <label htmlFor="wayOfPayment" className="mb-1 text-sm sm:text-base">
          Select way of payment
        </label>
        <select
          id="wayOfPayment"
          name="wayOfPayment"
          className="p-2 border rounded w-full sm:w-[20rem]"
          required
        >
          <option value="">Way of payment</option>
          <option value="inCash">In cash, on delivery</option>
        </select>
      </div>

      <button
        disabled={isLoading}
        className="border-2 border-black rounded-md bg-orange-300 w-[80%] sm:w-[40%] text-xl py-2 text-black hover:bg-orange-400 transition-all duration-300 ease-in-out"
      >
        {isLoading ? "Submitting..." : "Submit order"}
      </button>
    </form>
  );
}

export default OrderForm;
