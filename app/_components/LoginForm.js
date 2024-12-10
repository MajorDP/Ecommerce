"use client";

import { useState } from "react";
import { login } from "../_lib/_api/userServices";
import { useRouter } from "next/navigation";

function LoginForm() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const formData = new FormData(form);

    const userData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const { data, error } = await login(userData);
    setLoading(false);

    console.log(data);
    if (error !== null) {
      setError(error.message);
      return;
    }
    window.location.href = "/";
  }
  return (
    <form
      onSubmit={handleLogin}
      className="m-auto  flex flex-col border-2 border-black rounded-xl p-5 text-xl"
    >
      <div className="flex flex-col items-center mb-2">
        <label htmlFor="email">Email</label>
        <input name="email" id="email" className="" required />
      </div>
      <div className="flex flex-col justify-center items-center">
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          id="password"
          className=""
          required
        />
      </div>
      <button
        disabled={loading}
        className="border-2 border-black rounded-md bg-orange-300 mt-5 w-[50%] m-auto text-xl"
      >
        {loading ? "Please wait..." : "Sign in"}
      </button>
      {error !== null && (
        <p className="text-sm m-auto text-red-500 p-0">{error}</p>
      )}
    </form>
  );
}

export default LoginForm;
