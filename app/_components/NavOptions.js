"use client";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { getCurrentUser } from "../_lib/_api/userServices";
import Spinner from "./Spinner";

function NavOptions() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  console.log("user::");
  console.log(user);

  useEffect(() => {
    let isMounted = true;
    async function getUser() {
      const userData = await getCurrentUser();
      if (isMounted) {
        setUser(userData);
        setIsLoading(false);
      }
    }
    getUser();
    return () => {
      isMounted = false; // Prevent state updates on unmounted components
    };
  }, []);

  if (isLoading) return <Spinner abs={true} />;
  return (
    <>
      {user !== null ? (
        <>
          <Link className="underline-animation m-auto" href="/">
            Home
          </Link>
          <Link className="underline-animation m-auto" href="/browse">
            Browse
          </Link>
          <Link className="underline-animation m-auto" href="/account/user">
            Account
          </Link>
        </>
      ) : (
        <>
          <Link className="underline-animation m-auto" href="/">
            Home
          </Link>
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
