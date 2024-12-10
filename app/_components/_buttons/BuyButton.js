"use client";
function BuyButton({ handleBuy }) {
  return (
    <button
      onClick={() => handleBuy()}
      className="border border-black rounded-md bg-green-500 p-2 w-14 mt-2 hover:bg-green-600 hover:text-white hover:scale-110 duration-100"
    >
      Buy
    </button>
  );
}

export default BuyButton;
