import { Suspense } from "react";
import UserSalesList from "@/app/_components/_account/UserSalesList";

function Page() {
  return (
    <Suspense>
      <p className="p-4 bg-gradient-to-r from-slate-500 via-blue-400 to-slate-500 border border-black text-white w-[90%] sm:w-[45%] lg:w-[45%] rounded-3xl m-auto mt-6 text-center text-sm sm:text-2xl font-semibold shadow-lg">
        Your sales history
      </p>
      <UserSalesList />
    </Suspense>
  );
}

export default Page;
