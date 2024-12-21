import Map from "@/app/_components/_map/Map";
import OrderSteps from "@/app/_components/OrderSteps";
import Link from "next/link";

function page({ params }) {
  console.log(params);
  return (
    <div className="text-center flex flex-col h-full">
      <OrderSteps />
    </div>
  );
}

export default page;
