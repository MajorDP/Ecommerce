"use client";
import { Suspense, useEffect, useState } from "react";
import PartnershipDetails from "./PartnershipDetails";
import { checkForPartnerShip, getUserInfo } from "../_lib/_api/userServices";
import Spinner from "./Spinner";

function Partnership() {
  const [isModalOpen, setIsModalOpen] = useState(null);
  const [partnership, setPartnership] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  console.log(partnership?.isAccepted);
  useEffect(function () {
    async function checkPartnerShip() {
      const data = await checkForPartnerShip();
      const user = await getUserInfo();
      setUser(user);
      setPartnership(data);
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
        {partnership?.isAccepted === undefined && user?.isPartner === false && (
          <p className="text-sm text-gray-500">
            Request partnership with Ecomms in order to be able to sell your own
            products on our website!
          </p>
        )}
        {partnership?.isAccepted === false && user?.isPartner === false && (
          <p className="text-sm text-gray-600">
            Your partnership request is being reviewed, you can change your
            information anytime.
          </p>
        )}
        {partnership?.isAccepted === true && user?.isPartner === true && (
          <p className="text-sm text-gray-600">
            You are currently a partner, you can revoke or change your
            information anytime.
          </p>
        )}

        {!isLoading ? (
          // Case 1: User is a partner and accepted
          user?.isPartner === true && partnership?.isAccepted === true ? (
            <button
              onClick={() => setIsModalOpen("revoke")}
              className="border border-black rounded-full p-2 mt-2 bg-orange-300"
            >
              Revoke partnership
            </button>
          ) : // Case 2: User has requested but is not yet accepted
          user?.isPartner === false && partnership?.isAccepted === false ? (
            <button
              onClick={() => setIsModalOpen("revoke")}
              className="border border-black rounded-full p-2 mt-2 bg-orange-300"
            >
              Revoke partnership
            </button>
          ) : // Case 3: User hasn't requested partnership yet
          user?.isPartner === false && partnership?.isAccepted === undefined ? (
            <button
              onClick={() => setIsModalOpen("request")}
              className="border border-black rounded-full p-2 mt-2 bg-orange-300"
            >
              Request partnership
            </button>
          ) : null
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
}

export default Partnership;
