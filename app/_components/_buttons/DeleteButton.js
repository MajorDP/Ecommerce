"use client";
function DeleteButton({ handleDelete }) {
  return (
    <button
      onClick={() => handleDelete()}
      className="border border-black rounded-md text-center bg-red-400 p-2 w-16 mt-2 hover:bg-red-500 hover:text-white hover:scale-110 duration-100"
    >
      Delete
    </button>
  );
}

export default DeleteButton;
