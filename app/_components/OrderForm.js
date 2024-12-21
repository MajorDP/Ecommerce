"use client";

import { useEffect, useState } from "react";
import { getCurrentUser, getUserInfo } from "../_lib/_api/userServices";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { initCart } from "../_lib/_api/cart";

function OrderForm() {
  const [user, setUser] = useState(null);
  const [value, setValue] = useState();
  useEffect(function () {
    async function getUser() {
      const user = await getCurrentUser();
      const userData = await getUserInfo(user.user.id);
      setUser(userData);
    }

    getUser();
  }, []);
  return (
    <form className="flex flex-col items-center justify-center border-1 border-black p-5 text-xl w-full max-w-md">
      {/* Full Name Field */}
      <div className="flex flex-col items-center mb-2 w-[20rem]">
        <label htmlFor="fullName" className="mb-1">
          Full Name
        </label>
        <input
          name="fullName"
          id="fullName"
          className="p-1 border rounded w-[20rem]"
          placeholder="Pavel Nikolov"
          required
        />
      </div>

      {/* Email Field */}
      <div className="flex flex-col items-center mb-2 w-[20rem]">
        <label htmlFor="email" className="mb-1">
          Email Address
        </label>
        <input
          name="email"
          id="email"
          className="p-1 border rounded w-[20rem]"
          placeholder="asura@abv.bg"
          required
        />
      </div>

      {/* Physical Address Field */}
      <div className="flex flex-col items-center mb-2 w-[20rem]">
        <label htmlFor="physicalAddress" className="mb-1">
          Physical Address
        </label>
        <input
          name="physicalAddress"
          id="physicalAddress"
          className="p-1 border rounded w-[20rem]"
          placeholder="Bul. Bulgaria 68"
          required
        />
      </div>

      {/* Postal Code Field */}
      <div className="flex flex-col items-center mb-2 w-[20rem]">
        <label htmlFor="postalCode" className="mb-1">
          Your Postal Code
        </label>
        <input
          name="postalCode"
          id="postalCode"
          className="p-1 border rounded w-[20rem]"
          placeholder="5000"
          required
        />
      </div>

      {/* Phone Number Field */}
      <div className="flex flex-col justify-center items-center mb-2 w-[20rem] p-1 rounded">
        <label htmlFor="phone" className="mb-1">
          Phone Number
        </label>
        <PhoneInput
          countries={["BG"]}
          defaultCountry="BG"
          value={value}
          onChange={setValue}
          name="phone"
          id="phone"
          className="w-[20rem] border rounded"
        />
      </div>
      <div className="flex flex-col items-center mb-2 w-[20rem]">
        <label htmlFor="role" className="mb-1">
          Select way of payment
        </label>
        <select
          id="role"
          name="role"
          className="p-2 border rounded w-full"
          required
        >
          <option value="">Way of payment</option>
          <option value="inCash">In cash, on delivery</option>
        </select>
      </div>
      <button className="border-2 border-black rounded-md bg-orange-300 mt-5 w-[40%] m-auto text-xl">
        Submit order
      </button>
    </form>
  );
}

export default OrderForm;
