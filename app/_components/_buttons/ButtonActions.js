"use client";
import { deleteProduct } from "@/app/_lib/_api/productServices";
import DeleteButton from "./DeleteButton";
import AddToCartButton from "./AddToCartButton";
import EditButton from "./EditButton";
import { getCurrentUser } from "@/app/_lib/_api/userServices";
import { Suspense, useEffect, useState } from "react";
import ConfirmationModal from "../ConfirmationModal";
import { addToCart, initCart } from "@/app/_lib/_api/cart";

function ButtonActions({ listedBy, product, productId }) {
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

  const handleAddToCart = async (params) => {
    try {
      addToCart(product);
      console.log("buy function here");
    } catch (error) {}
  };

  return (
    <Suspense fallback={<p>Loading</p>}>
      <div className="flex flex-row w-56 justify-between">
        {listedBy !== user?.user.id ? (
          <AddToCartButton
            handleAddToCart={handleAddToCart}
            productId={productId}
          />
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
