import Link from "next/link";

function CartCard({ product, onRemove }) {
  console.log(product);
  return (
    <li
      key={product.id}
      className="cursor-pointer m-3 border-4 border-black rounded-md bg-gray-200 w-full sm:w-[28rem] lg:w-[28rem]"
    >
      <Link
        href={`/browse/product/${product.id}`}
        className="flex flex-col sm:flex-row justify-start"
      >
        {/* Product Image */}
        <div className="z-10 h-[11rem] sm:h-[12rem] w-full sm:w-[50%] relative bg-white">
          <img
            src={product?.options ? product.options.img : product.productImg}
            alt="Product Image"
            className="object-cover w-full h-full border-r-2 border-black"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between w-full sm:w-[50%] p-2">
          {/* Product Name */}
          <p className="text-start text-sm overflow-hidden text-ellipsis whitespace-nowrap">
            {product.productName}
          </p>

          {/* Price and Remove Button */}
          <div className="flex justify-between items-center mt-2">
            <p className="text-start font-semibold text-green-500">
              {product.productPrice}$
            </p>
            <span
              onClick={(e) => {
                e.preventDefault();
                onRemove(product.id);
                window.location.reload(); // You may want to update the cart state without reload
              }}
              className="border border-black rounded-md text-sm bg-red-400 p-1 w-25 sm:w-auto mt-2 hover:bg-red-500 hover:text-white hover:scale-105 duration-100"
            >
              Remove from cart
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default CartCard;
