import Link from "next/link";

function OrderNotFound() {
  return (
    <div className="w-[90%] mx-auto mt-16 p-6 bg-slate-50 shadow-md rounded-lg text-center ">
      <div>
        <h1 className="text-xl font-bold text-gray-800 mb-4">
          Sorry, we couldn&apos;t find the order you are looking for!
        </h1>
        <p className="text-gray-600">
          Return to your cart{" "}
          <Link href={`/account/cart`} className="text-green-600 underline">
            here
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

export default OrderNotFound;
