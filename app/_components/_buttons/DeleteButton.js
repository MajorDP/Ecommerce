"use client";

import ConfirmationModal from "../ConfirmationModal";

function DeleteButton({ onClick, onClose, isModalOpen, handleDelete }) {
  return (
    <>
      {isModalOpen && (
        <ConfirmationModal
          type={isModalOpen}
          onClose={() => onClose()}
          onConfirm={() => handleDelete()}
        />
      )}
      <button
        onClick={() => onClick()}
        className="border border-black rounded-md text-center bg-red-400 p-2 w-25 mt-2 hover:bg-red-500 hover:text-white hover:scale-110 duration-100"
      >
        Remove
      </button>
    </>
  );
}

export default DeleteButton;
