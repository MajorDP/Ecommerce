"use client";
import { deleteProduct } from "@/app/_lib/_api/productServices";
import DeleteButton from "./DeleteButton";
import BuyButton from "./BuyButton";
import EditButton from "./EditButton";

function ButtonActions() {
  const handleDeleteProduct = async (params) => {
    try {
      // await deleteProduct();
      console.log("delete function here");
    } catch (error) {}
  };

  const handleBuyProduct = async (params) => {
    try {
      console.log("buy function here");
    } catch (error) {}
  };

  const handleEditProduct = async (params) => {
    try {
      console.log("edit function here");
    } catch (error) {}
  };
  return (
    <div className="flex flex-row w-56 justify-between">
      <BuyButton handleBuy={handleBuyProduct} />
      <EditButton handleEdit={handleEditProduct} />
      <DeleteButton handleDelete={handleDeleteProduct} />
    </div>
  );
}

export default ButtonActions;
