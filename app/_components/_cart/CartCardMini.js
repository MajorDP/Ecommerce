import Link from "next/link";

function CartCardMini({ product, onRemove }) {
  return (
    <li
      key={product.id}
      className=" m-3 border-4 border-black rounded-md bg-gray-200 w-[14rem]"
    >
      <div className="flex flex-row justify-start ">
        <Link
          className="cursor-pointer z-10 h-[5.5rem] w-[50%] relative bg-white"
          href={`/browse/product/${product.id}`}
        >
          <img
            src={product.options ? product.options.img : product.productImg}
            alt="Product Image"
            className="object-fit w-full h-full border-r-2 border-black"
          />
        </Link>
        <div className="w-[50%]">
          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-row justify-between w-full">
              <div className="w-[80%]">
                <p className="text-startp-1 text-sm overflow-hidden whitespace-nowrap text-ellipsis">
                  {product.productName}
                </p>
              </div>
              <div className="w-[20%] bg-red-500">
                <p className="w-full flex justify-between items-center  text-start font-semibold">
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      onRemove(product.id);
                    }}
                    className="border border-black text-sm text-center bg-red-400 p-1 w-full hover:bg-red-500 hover:text-white hover:scale-105 duration-100"
                  >
                    X
                  </span>
                </p>
              </div>
            </div>
            <span className="hover:scale-105 duration-150 text-green-500 text-start pl-1">
              {product.productPrice}$
            </span>
          </div>
        </div>
      </div>
    </li>
  );
}

export default CartCardMini;
