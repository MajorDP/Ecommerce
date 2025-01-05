"use client";
function ConfirmationModal({ type, onClose, onConfirm }) {
  return (
    <div
      className="animate-slideUpModal absolute z-20 flex flex-col items-center justify-center bg-white shadow-md border border-black rounded-xl 
    w-[90%] sm:w-[60%] md:w-[40%] lg:w-[30%] h-[30%] sm:h-[25%] lg:h-[20%] 
    top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
    >
      <div className="flex items-center justify-center">
        <p className="text-lg sm:text-xl text-center">
          Are you sure you want to {type === "delete" ? "delete" : "buy"} this
          product?
        </p>
      </div>

      <div className="flex flex-row mt-5 w-full sm:w-[70%] justify-between px-4">
        <button
          onClick={onConfirm}
          className="border border-black rounded-md text-center bg-green-400 p-2 w-[40%] sm:w-[30%] lg:w-[25%] mt-2 
          hover:bg-green-500 hover:text-white hover:scale-105 transition-transform duration-200 ease-in-out"
        >
          Yes
        </button>
        <button
          onClick={onClose}
          className="border border-black rounded-md text-center bg-red-400 p-2 w-[40%] sm:w-[30%] lg:w-[25%] mt-2 
          hover:bg-red-500 hover:text-white hover:scale-105 transition-transform duration-200 ease-in-out"
        >
          No
        </button>
      </div>
    </div>
  );
}

export default ConfirmationModal;
