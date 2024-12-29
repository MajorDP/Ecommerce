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
      className="m-auto bg-gradient-to-tr from-teal-200 to-blue-300 w-[90%] sm:w-[60%] h-full sm:h-[30vh] flex flex-col sm:flex-row justify-between border border-gray-300 rounded-xl p-3 mt-2 mb-6 transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105"
    >
      <div
        className={`grid bg-white ${
          // Singular size for pictures regardless of amount
          "h-full w-full sm:w-[46%]"
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
              className={`border border-gray-300 object-contain w-full h-full ${
                index % 2 === 1 ? "border-l-0" : ""
              } ${index <= 1 && imgLength > 2 ? "border-b-0" : ""}`}
            />
          )
        )}
      </div>
      <div className="w-full sm:w-[54%] flex flex-col justify-between text-sm sm:text-base lg:text-[1rem] border border-gray-300 p-5">
        <div>
          <p className="text-gray-700">Sale ID: {sale.id}</p>
          <p className="text-gray-700">
            Ordered on: {formatDate(sale.created_at)}
          </p>
        </div>
        <div>
          <p className="text-gray-700">
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
          <p className="text-gray-700">Total: {totalPrice.toFixed(2)} 💲</p>
        </div>
      </div>
    </Link>
  );
}

export default SaleCard;
