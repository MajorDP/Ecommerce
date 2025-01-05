import OrderSteps from "@/app/_components/_cart/OrderSteps";
import Spinner from "@/app/_components/Spinner";
import { Suspense } from "react";

function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <div className="text-center flex flex-col h-full">
        <OrderSteps />
      </div>
    </Suspense>
  );
}

export default Page;
