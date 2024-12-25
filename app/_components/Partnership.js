"use client";
import { Suspense, useEffect, useState } from "react";
import PartnershipDetails from "./PartnershipDetails";
import { checkForPartnerShip } from "../_lib/_api/userServices";
import Spinner from "./Spinner";

function Partnership() {
  const [isModalOpen, setIsModalOpen] = useState(null);
  const [isPartner, setIsPartner] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  console.log(isPartner);
  useEffect(function () {
    async function checkPartnerShip() {
      const data = await checkForPartnerShip();
      setIsPartner(data);
      setIsLoading(false);
    }
    checkPartnerShip();
  }, []);
  return (
    <>
      {isModalOpen === "request" && (
        <PartnershipDetails setIsModalOpen={setIsModalOpen} type="request" />
      )}
      {isModalOpen === "revoke" && (
        <PartnershipDetails setIsModalOpen={setIsModalOpen} type="revoke" />
      )}
      <div className="w-[90%] text-center m-auto mt-3">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Ecomms Partnership
        </h2>
        <p className="text-sm text-gray-500">
          Request partnership with Ecomms in order to be able to sell your own
          products at our website!
        </p>
        {!isLoading ? (
          isPartner === null ? (
            <button
              onClick={() => setIsModalOpen("request")}
              className="border border-black rounded-full p-2 mt-2 bg-orange-300"
            >
              Learn more
            </button>
          ) : (
            <button
              onClick={() => setIsModalOpen("revoke")}
              className="border border-black rounded-full p-2 mt-2 bg-orange-300"
            >
              Revoke partnership
            </button>
          )
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
}

export default Partnership;
