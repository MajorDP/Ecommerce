"use client";
import { deleteProduct } from "@/app/_lib/_api/productServices";
import DeleteButton from "./DeleteButton";
import AddToCartButton from "./AddToCartButton";
import EditButton from "./EditButton";
import { getCurrentUser } from "@/app/_lib/_api/userServices";
import { Suspense, useEffect, useState } from "react";
import ConfirmationModal from "../ConfirmationModal";
import { addToCart, initCart } from "@/app/_lib/_api/cart";
import toast from "react-hot-toast";

function ButtonActions({ quantity, selectedOption, product }) {
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
      await deleteProduct(product.id);
      setIsModalOpen(null);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAddToCart = async (params) => {
    try {
      const newProduct = {
        ...product,
        options: selectedOption,
        quantity: quantity,
      };
      addToCart(newProduct);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Suspense fallback={<p>Loading</p>}>
      <div className="flex flex-row w-56 justify-between">
        {product.listedBy !== user?.user.id ? (
          <AddToCartButton
            handleAddToCart={handleAddToCart}
            productId={product.id}
          />
        ) : (
          <div className="w-[70%] flex justify-between">
            <EditButton productId={product.id} />
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
