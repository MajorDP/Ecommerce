"use client";
import { useEffect, useState } from "react";
import { initCart, removeFromCart } from "../_lib/_api/cart";
import ToastMessage from "./ToastMessage";
import CartCardMini from "./CartCardMini";
import toast from "react-hot-toast";

function CartDetailsMini() {
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page + itemsPerPage - 1;

  const totalCost = cart
    .reduce((acc, curr) => acc + curr.productPrice, 0)
    .toFixed(2);

  useEffect(() => {
    setCart(initCart());
  }, []);

  function onRemove(productId) {
    removeFromCart(productId);
    setCart(cart.filter((product) => product.id !== productId));
    toast.success(
      <ToastMessage
        message={"Product removed from cart!"}
        link={`/account/cart`}
        linkMessage={"Go back to cart"}
      />,
      {
        duration: 5000,
      }
    );
  }
  return (
    <div>
      <p className="text-xl">Your total: {totalCost}$</p>
      <div className="border-2 border-black rounded-xl  flex justify-center mt-4 items-center">
        {cart.length > 4 && (
          <button
            className="h-12 bg-gray-600 text-white p-2 rounded-full hover:bg-gray-400 hover:text-black"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            &lt;
          </button>
        )}
        <ul className={`grid grid-rows-2 grid-cols-2`}>
          {cart.slice(startIndex, endIndex).map((product, index) => (
            <CartCardMini product={product} key={index} onRemove={onRemove} />
          ))}
        </ul>
        {cart.length > 4 && (
          <button
            className="h-12 text-center bg-gray-600 text-white p-2 rounded-full hover:bg-gray-400 hover:text-black"
            onClick={() => setPage(page + 1)}
            disabled={endIndex >= cart.length}
          >
            &gt;
          </button>
        )}
      </div>
    </div>
  );
}

export default CartDetailsMini;
