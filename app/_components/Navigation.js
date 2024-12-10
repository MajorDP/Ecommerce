"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";
import { getCurrentUser } from "../_lib/_api/userServices";
import { useEffect, useState } from "react";

function Navigation() {
  const [user, setUser] = useState(null);
  console.log(user);
  useEffect(() => {
    async function fetchUser() {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    }

    fetchUser();
  }, []);
  return (
    <header className="animate-slideDown bg-white relative w-[100%] p-4">
      <div className="flex justify-between w-[70%] m-auto">
        <div className="w-[20%] mr-[10%]">
          <Link href="/">
            <Image src={logo} alt="logo" width={150} height={150} />
          </Link>
        </div>
        <div className="flex justify-between gap-5 w-full sm:text-sm lg:text-xl">
          <Link className="underline-animation m-auto" href="/">
            Home
          </Link>
          {user?.data?.user !== null ? (
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
        </div>
      </div>
    </header>
  );
}

export default Navigation;
