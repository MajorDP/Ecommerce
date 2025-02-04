"use client";
import Image from "next/image";
import UserInfoUpdater from "./UserInfoUpdater";
import bgImg from "@/public/bg-1.jpg";
import { useEffect, useState } from "react";
import { getCurrentUser, getUserInfo } from "../_lib/_api/userServices";

function UserAccountInfo() {
  const [isModalOpen, setIsModalOpen] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(function () {
    async function getUser() {
      const userData = await getUserInfo();
      setUserData(userData);
    }

    getUser();
  }, []);
  return (
    <>
      {isModalOpen && (
        <UserInfoUpdater
          type={isModalOpen}
          id={userData.id}
          onClose={() => setIsModalOpen(null)}
        />
      )}
      <div className="flex flex-col lg:flex-row justify-between mt-10 mx-5 lg:mx-[20%]">
        <div className="border border-black rounded-[50%] w-44 h-44 overflow-hidden relative mx-auto lg:mx-0">
          <Image
            src={bgImg}
            alt="aa"
            className="object-cover w-full h-full z-10"
          />
          <input type="image" placeholder="aa" />
        </div>

        <div className="flex flex-col mt-10 lg:mt-0 lg:ml-10 h-full overflow-y-auto">
          <div className="flex flex-col text-lg sm:text-xl text-start mb-5">
            <label>Email:</label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center">
              <input
                id="email"
                type="email"
                readOnly
                className="border border-black rounded-md w-full sm:w-[50%] pl-1 pr-1 mb-3 sm:mb-0"
                defaultValue={userData?.email.replace(/^[^@]+/, (match) =>
                  "*".repeat(match.length)
                )}
              />
              <button
                onClick={() => setIsModalOpen("email")}
                className="border border-black rounded-xl text-sm font-medium sm:ml-5 text-center p-1 bg-orange-300 w-full sm:w-auto"
              >
                Change Email
              </button>
            </div>
          </div>

          <div className="flex flex-col text-lg sm:text-xl text-start mb-5">
            <label>Username:</label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center">
              <input
                id="username"
                type="text"
                readOnly
                className="border border-black rounded-md w-full sm:w-[50%] pl-1 pr-1 mb-3 sm:mb-0"
                defaultValue={userData?.username}
              />
              <button
                onClick={() => setIsModalOpen("username")}
                className="border border-black rounded-xl text-sm font-medium sm:ml-5 text-center p-1 bg-orange-300 w-full sm:w-auto"
              >
                Change Username
              </button>
            </div>
          </div>

          <div className="flex flex-col text-lg sm:text-xl text-start mb-5">
            <label>Password</label>
            <div className="flex justify-start">
              <button
                onClick={() => setIsModalOpen("password")}
                className="border border-black rounded-xl text-sm font-medium text-center p-1 bg-orange-300 w-full sm:w-auto"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserAccountInfo;
