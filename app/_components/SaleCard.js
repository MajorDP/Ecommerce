"use client";

import Link from "next/link";
import { formatDate } from "../_lib/helpers";

function SaleCard({ sale, type }) {
  console.log(sale);
  const imgLength =
    sale.items.length === 1 ? 1 : sale.items.length >= 4 ? 4 : 2;

  const totalPrice = sale.items.reduce(
    (acc, item) => acc + item.productPrice,
    0
  );

  return (
    <Link
      href={`/account/${type === "sales" ? "sales" : "purchases"}/${sale.id}`}
      className="m-auto bg-gradient-to-tr from-teal-100 to-teal-300  w-[60%] h-[30vh] flex flex-row justify-between border border-black rounded-xl p-3 mt-2 mb-6"
    >
      <div
        className={`grid bg-white ${
          //singular size for pictures regardless of amount
          "h-full w-[46%]"
          // size of pictures based on amount:
          // imgLength === 1 ? "w-1/3" : imgLength === 4 ? "h-full" : "w-[55%]"
        } ${
          imgLength >= 4
            ? "grid-cols-2 grid-rows-2"
            : imgLength === 2
            ? "grid-cols-2 grid-rows-1"
            : "grid-cols-1 grid-rows-1"
        }`}
      >
        {sale.items.map((item, index) =>
          (index > 1 && imgLength === 2) || (index > 3 && imgLength === 4) ? (
            ""
          ) : (
            <img
              key={index}
              src={item.productImg[0]}
              alt="Product Image"
              className={`border border-black object-contain w-full h-full  ${
                index % 2 === 1 ? "border-l-0" : ""
              } ${index <= 1 && imgLength > 2 ? "border-b-0" : ""}
              }`}
            />
          )
        )}
      </div>
      <div className="w-[40%] flex flex-col justify-between lg:text-[1rem] border border-black p-5 md:text-xs sm:text-xs">
        <div>
          <p>Sale ID: {sale.id}</p>
          <p>Ordered on: {formatDate(sale.created_at)}</p>
        </div>
        <div>
          <p>
            Status:{" "}
            <span
              className={`${
                sale.status === "Delivered"
                  ? "text-green-500"
                  : sale.status === "Cancelled"
                  ? "text-red-500"
                  : sale.status === "Shipping"
                  ? "text-orange-500"
                  : sale.status === "Unconfirmed"
                  ? "text-orange-500"
                  : ""
              }`}
            >
              {sale.status}
            </span>
          </p>
          <p>Total: {totalPrice} 💲</p>
        </div>
      </div>
    </Link>
  );
}

export default SaleCard;
