"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../_lib/_api/userServices";

function NavOptions() {
  const [user, setUser] = useState(null);
  console.log(user);
  useEffect(function () {
    async function getUser() {
      const userData = await getCurrentUser();
      setUser(userData);
    }
    getUser();
  }, []);
  return (
    <>
      {user?.user !== null ? (
        <>
          <Link className="underline-animation m-auto" href="/browse">
            Browse
          </Link>
          <Link className="underline-animation m-auto" href="/account/user">
            Account
          </Link>
        </>
      ) : (
        <>
          <Link className="underline-animation m-auto" href="/register">
            Register
          </Link>
          <Link className="underline-animation m-auto" href="/login">
            Login
          </Link>
        </>
      )}
    </>
  );
}

export default NavOptions;
