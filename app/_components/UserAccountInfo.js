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
      const user = await getCurrentUser();
      console.log(user);
      const userData = await getUserInfo(user.user.id);
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
      <div className="flex justify-between mt-10 ml-[20%] mr-[20%]">
        <div className="border border-black rounded-[50%] w-52 h-52 overflow-hidden relative">
          <Image
            src={bgImg}
            alt="aa"
            className="object-cover w-full h-full z-10"
          />
          <input type="image" placeholder="aa" />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col text-xl text-start mb-5">
            <label>Email:</label>
            <div className="flex flex-row">
              <input
                id="email"
                type="email"
                className="border border-black rounded-md w-[50%] pl-1 pr-1"
                defaultValue={userData?.email.replace(/^[^@]+/, (match) =>
                  "*".repeat(match.length)
                )}
              />
              <button
                onClick={() => setIsModalOpen("email")}
                className="border border-black rounded-xl text-sm font-sm ml-5 text-center p-1 pt-1 bg-orange-300"
              >
                Change Email
              </button>
            </div>
          </div>
          <div className="flex flex-col text-xl text-start mb-5">
            <label>Username:</label>
            <input
              id="username"
              type="text"
              className="border border-black rounded-md w-[50%] pl-1 pr-1"
              defaultValue={userData?.username}
            />
          </div>
          {/* <div className="flex flex-col text-xl text-start mb-5">
            <label>Password:</label>
            <div className="flex flex-row">
              <input
                id="password"
                type="password"
                className="border border-black rounded-md w-[50%] pl-1 pr-1"
                value={userData.password}
              />
              <button
                onClick={() => setIsModalOpen("password")}
                className="border border-black rounded-xl text-sm font-sm ml-5 text-center p-1 pt-1 bg-orange-300"
              >
                Change Password
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default UserAccountInfo;
