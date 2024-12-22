import Map from "@/app/_components/_map/Map";
import OrderSteps from "@/app/_components/OrderSteps";
import Link from "next/link";
import { Suspense } from "react";

function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="text-center flex flex-col h-full">
        <OrderSteps />
      </div>
    </Suspense>
  );
}

export default Page;
