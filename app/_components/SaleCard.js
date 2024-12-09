"use client";

import Link from "next/link";

function SaleCard({ sale, type }) {
  console.log(sale);
  //TODO: ADD IMAGES TO SALES IN DATABASE
  const tempImgData = [1, 2, 3, 4, 5, 6, 7, 8];
  const imgLength =
    tempImgData.length === 1 ? 1 : tempImgData.length >= 4 ? 4 : 2;
  return (
    <Link
      href={`/account/${type === "sales" ? "sales" : "purchases"}/${
        sale.orderId
      }`}
      className="m-auto w-[60%] h-[30vh] flex flex-row justify-between border border-black rounded-xl p-3 mt-2 mb-6"
    >
      <div
        className={`grid bg-red-200 w-[50%] ${
          imgLength >= 4
            ? "grid-cols-2 grid-rows-2"
            : imgLength === 2
            ? "grid-cols-2 grid-rows-1"
            : "grid-cols-1 grid-rows-1"
        }`}
      >
        {tempImgData.map((el, index) =>
          (index > 1 && imgLength === 2) || (index > 3 && imgLength === 4) ? (
            ""
          ) : (
            <p className="border border-black w-[100%]">{el}</p>
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
