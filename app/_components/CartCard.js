import Link from "next/link";

function CartCard({ product, onRemove }) {
  return (
    <li
      key={product.id}
      className="cursor-pointer m-3 border-4 border-black rounded-md bg-gray-200 w-[28rem]"
    >
      <Link
        href={`/browse/product/${product.id}`}
        className="flex flex-row justify-start "
      >
        <div className="z-10 h-[11rem] w-[50%] relative bg-white">
          <img
            src={
              product.options !== null
                ? product.options.img
                : product.productImg
            }
            alt="Product Image"
            className="object-fit w-full h-full border-r-2 border-black"
          />
        </div>
        <div className="flex flex-col justify-between w-[50%]">
          <div>
            <p className="text-start p-1 text-sm overflow-hidden whitespace-nowrap text-ellipsis">
              {product.productName}
            </p>
          </div>
          <div>
            <p className=" flex justify-between items-center p-1 text-start font-semibold">
              <span className="hover:scale-105 duration-150 text-green-500">
                {product.productPrice}$
              </span>
              <span
                onClick={(e) => {
                  e.preventDefault();
                  onRemove(product.id);
                  window.location.reload();
                }}
                className="border border-black rounded-md text-sm text-center bg-red-400 p-1 w-25 mt-2 hover:bg-red-500 hover:text-white hover:scale-105 duration-100"
              >
                Remove from cart
              </span>
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default CartCard;
