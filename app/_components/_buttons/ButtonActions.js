"use client";
import { deleteProduct } from "@/app/_lib/_api/productServices";
import DeleteButton from "./DeleteButton";
import BuyButton from "./BuyButton";
import EditButton from "./EditButton";
import { getCurrentUser } from "@/app/_lib/_api/userServices";
import { Suspense, useEffect, useState } from "react";
import ConfirmationModal from "../ConfirmationModal";

function ButtonActions({ listedBy, productId }) {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(null);

  useEffect(function () {
    async function getUser() {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    }
    getUser();
  }, []);

  const handleDeleteProduct = async (params) => {
    try {
      await deleteProduct(productId);
      setIsModalOpen(null);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleBuyProduct = async (params) => {
    try {
      console.log("buy function here");
    } catch (error) {}
  };

  return (
    <Suspense fallback={<p>Loading</p>}>
      <div className="flex flex-row w-56 justify-between">
        {listedBy !== user?.user.id ? (
          <BuyButton handleBuy={handleBuyProduct} />
        ) : (
          <div className="w-[70%] flex justify-between">
            <EditButton productId={productId} />
            <DeleteButton
              isModalOpen={isModalOpen}
              onClose={() => setIsModalOpen(null)}
              onClick={() => setIsModalOpen("delete")}
              handleDelete={handleDeleteProduct}
            />
          </div>
        )}
      </div>
    </Suspense>
  );
}

export default ButtonActions;
