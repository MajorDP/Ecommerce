import Link from "next/link";
import { signout } from "../_lib/_api/userServices";
import SignOutButton from "../_components/_userAuth/SignOutButton";
import ProtectedRoute from "../_components/_userAuth/ProtectedRoute";

function Layout({ children }) {
  return (
    <ProtectedRoute>
      <div className=" h-0 sm:h-[4rem] bg-gradient-to-l from-white to-slate-200"></div>
      <div className="flex h-screen">
        <div className="w-[45%] sm:w-[20%] bg-gradient-to-b from-slate-200 to-slate-300 flex flex-col pl-2 pr-2 sm:pl-6 md:text-sm lg:text-xl border-t-black border border-b-black">
          <Link href="/account/user" className="underline-animation mt-5">
            My account
          </Link>
          <Link href="/account/products" className="underline-animation mt-5">
            My products
          </Link>
          <Link href="/account/cart" className="underline-animation mt-5">
            My cart
          </Link>
          <Link href="/account/purchases" className="underline-animation mt-5">
            Purchase History
          </Link>
          <Link href="/account/sales" className="underline-animation mt-5">
            Sales History
          </Link>
          <SignOutButton />
        </div>
        <div className="w-full bg-slate-200 border border-black">
          {children}
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default Layout;
