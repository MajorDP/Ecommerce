import CartDetails from "@/app/_components/CartDetails";

function Page() {
  return (
    <>
      <p className="p-4 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 border border-black text-white w-[90%] sm:w-[45%] rounded-3xl m-auto mt-6 text-center text-2xl font-semibold shadow-lg">
        Your cart
      </p>
      <div className="bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 w-[80%] sm:w-[95%] lg:h-[80%] sm:h-[30%] m-6  border rounded-xl overflow-y-auto overflow-x-hidden shadow-lg scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 hover:scrollbar-thumb-gray-500">
        <CartDetails />
      </div>
    </>
  );
}

export default Page;
