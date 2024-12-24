import { useState } from "react";
import PartnershipForm from "./PartnershipForm";
import { revokePartnership } from "../_lib/_api/userServices";

function PartnershipDetails({ setIsModalOpen, type }) {
  const [step, setStep] = useState(1);

  if (type === "revoke") {
    return (
      <div className="animate-slideUpModal absolute z-20 bg-white shadow-md border border-black rounded-xl w-[90%] sm:w-[30%] h-[15rem] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-6 overflow-y-auto">
        <h2 className="text-lg font-bold mb-4 text-center">
          Revoke partnership
        </h2>
        <div className="flex flex-col justify-between h-[50%]">
          <p className="mt-4 mb-4 text-md">
            Are you sure you want to revoke your membership? If you do so, all
            business with Ecomms ends and your products will immediately be
            taken off the website.
          </p>
          <div className="flex flex-row justify-around">
            <button
              onClick={() => {
                revokePartnership();
                window.location.href = "/account/user";
              }}
              className="w-[40%] border border-black rounded-xl p-1 bg-green-400 shadow-lg"
            >
              Yes
            </button>
            <button
              onClick={() => setIsModalOpen(null)}
              className="w-[40%]  border border-black rounded-xl p-1 bg-red-400 shadow-lg"
            >
              No
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="animate-slideUpModal absolute z-20 bg-white shadow-md border border-black rounded-xl w-[90%] sm:w-[30%] h-[60%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-6 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4 text-center">Partnership Rules</h2>
      <div className="flex flex-col justify-between h-full">
        {step === 1 ? (
          <>
            <ul className="list-decimal text-justify list-inside space-y-2 text-gray-600 text-sm">
              <li>Users have to enter all valid data to be accepted.</li>
              <li>
                The user must be located within Bulgaria&apos;s borders, as we
                only conduct business within Bulgaria.
              </li>
              <li>
                If accepted, users will be able to list products on the site.
              </li>
              <li>
                If their products are ordered, they get a notification inside
                their account.
              </li>
              <li>
                If the user confirms the order, they have to send the product to
                Ecomms HQ in Veliko Tarnovo, and their shipping bill for this is
                covered by the company.
              </li>
              <li>
                The company ships their product to the user, and upon receiving
                payment for the product, they send the money to the user via
                card (the one given by the user).
              </li>
              <li>The user is charged 10% of the order&apos;s total price.</li>
              <li>
                The partnership can be revoked by the user or Ecoms at any time
                and all mutual business ends.
              </li>
            </ul>
            <p className="text-center mt-4 mb-4 text-md">
              By agreeing to these rules, the user agrees to comply with the
              terms and conditions outlined above.
            </p>

            <div className="flex flex-row text-xs w-full justify-around">
              <button
                onClick={() => setStep(2)}
                className="w-[40%] border border-black rounded-xl p-1 bg-green-400 shadow-lg"
              >
                I agree with the given rules and wish to become a partner.
              </button>
              <button
                onClick={() => setIsModalOpen(null)}
                className="w-[40%]  border border-black rounded-xl p-1 bg-red-400 shadow-lg"
              >
                I disagree with the given rules and wish to close this panel.
              </button>
            </div>
          </>
        ) : (
          <PartnershipForm />
        )}
      </div>
    </div>
  );
}

export default PartnershipDetails;
