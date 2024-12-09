import Link from "next/link";

function Layout({ children }) {
  return (
    <div>
      <div className="h-[4rem] bg-gradient-to-l from-white to-slate-200"></div>
      <div className="flex h-screen">
        <div className="w-[20%] bg-gradient-to-b from-slate-200 to-slate-300 flex flex-col pl-6 md:text-sm lg:text-xl border-t-black border">
          <Link href="/account/user" className="underline-animation mt-5">
            Personal Information
          </Link>
          <Link href="/account/purchases" className="underline-animation mt-5">
            Purchase History
          </Link>
          <Link href="/account/sales" className="underline-animation mt-5">
            Sales History
          </Link>
          <Link href="" className="underline-animation mt-5">
            Log out
          </Link>
        </div>
        <div className="w-full bg-slate-200 border border-black">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
