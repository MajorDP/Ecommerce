import OrderNotFound from "@/app/_components/_account/OrderNotFound";
import SaleCard from "@/app/_components/SaleCard";
import Spinner from "@/app/_components/Spinner";
import { getOrder } from "@/app/_lib/_api/userServices";
import Link from "next/link";
import { Suspense } from "react";

async function Page({ params }) {
  const order = await getOrder(params.id);

  if (!order) {
    return <OrderNotFound />;
  }

  return (
    <Suspense fallback={<Spinner />}>
      <div className="w-[90%] sm:w-[80%] lg:w-[60%] mx-auto mt-16 p-6 bg-slate-50 shadow-md rounded-lg text-center h-[80%] sm:h-auto sm:overflow-hidden overflow-scroll">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
            Order Confirmed!
          </h1>
          <p className="text-gray-600 mb-6">
            Your order was successfully placed.
          </p>
          <p className="text-gray-600">
            You can track your order&apos;s details{" "}
            <Link
              href={`/account/purchases/${params.id}`}
              className="text-green-600 underline hover:text-green-800 transition-all duration-300 ease-in-out"
            >
              here
            </Link>
            .
          </p>
        </div>
        <Suspense fallback={<p>Loading...</p>}>
          <SaleCard sale={order} />
        </Suspense>
      </div>
    </Suspense>
  );
}

export default Page;
