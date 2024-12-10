"use client";

import Link from "next/link";

function SaleCard({ sale, type }) {
  const imgLength =
    sale.items.length === 1 ? 1 : sale.items.length >= 4 ? 4 : 2;
  return (
    <Link
      href={`/account/${type === "sales" ? "sales" : "purchases"}/${
        sale.orderId
      }`}
      className="m-auto w-[60%] h-[30vh] flex flex-row justify-between border border-black rounded-xl p-3 mt-2 mb-6"
    >
      <div
        className={`grid bg-white border  ${
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
              className={`border border-black object-contain w-full h-full ${
                index % 2 === 1 ? "border-l-0" : ""
              } ${index <= 1 && imgLength > 2 ? "border-b-0" : ""}
              }`}
            />
          )
        )}
      </div>
      <div className="w-[40%] flex flex-col justify-between text-xl">
        <div>
          <p>Sale ID: {sale.orderId}</p>
          <p>Ordered on: {sale.orderDate}</p>
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
                  : ""
              }`}
            >
              {sale.status}
            </span>
          </p>
          <p>Total: {sale.totalPrice} 💲</p>
        </div>
      </div>
    </Link>
  );
}

export default SaleCard;
