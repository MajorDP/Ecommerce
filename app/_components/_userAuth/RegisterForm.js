"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/app/_lib/_api/userServices";

function RegisterForm() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const formData = new FormData(form);

    if (formData.get("password") !== formData.get("repeatPassword")) {
      setError("Password and Repeat password don't match.");
      setLoading(false);
      return;
    }

    const userData = {
      email: formData.get("email"),
      username: formData.get("username"),
      password: formData.get("password"),
    };

    const { data, error } = await register(userData);
    if (error?.message) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    window.location.href = "/";
  }

  return (
    <form
      onSubmit={handleRegister}
      className="m-auto  flex flex-col border-2 border-black rounded-xl p-5 text-xl w-full sm:w-auto"
    >
      <div className="flex flex-col items-center mb-2">
        <label htmlFor="email" className="text-[1rem] sm:text-xl">
          Email
        </label>
        <input
          name="email"
          id="email"
          className=" w-full text-sm sm:text-xl"
          required
        />
      </div>
      <div className="flex flex-col justify-center items-center mb-2">
        <label htmlFor="username" className="text-[1rem] sm:text-xl">
          Username
        </label>
        <input
          name="username"
          id="username"
          className=" w-full text-sm sm:text-xl"
          required
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <label htmlFor="password" className="text-[1rem] sm:text-xl">
          Password
        </label>
        <input
          name="password"
          id="password"
          type="password"
          className=" w-full text-sm sm:text-xl"
          required
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <label htmlFor="repeatPassword" className="text-[1rem] sm:text-xl">
          Repeat password
        </label>
        <input
          name="repeatPassword"
          id="repeatPassword"
          type="password"
          className=" w-full text-sm sm:text-xl"
          required
        />
      </div>
      <button
        disabled={loading}
        type="submit"
        className="border-2 border-black rounded-md bg-orange-300 mt-5 w-[50%] m-auto text-[1rem] sm:text-xl mb-5"
      >
        {loading === false ? "Register" : "Please wait..."}
      </button>
      {error !== null && (
        <p className="text-sm text-center m-auto text-red-500 p-0">{error}</p>
      )}
    </form>
  );
}

export default RegisterForm;
