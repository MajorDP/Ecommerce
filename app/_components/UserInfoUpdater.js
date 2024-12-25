"use client";

import { useState } from "react";
import {
  getCurrentUser,
  getUserInfo,
  updateEmail,
  updatePassword,
  updateUsername,
} from "../_lib/_api/userServices";
import toast from "react-hot-toast";

function UserInfoUpdater({ type, userId, onClose }) {
  const [error, setError] = useState(null);
  async function handleUpdate(e, type) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const oldCredential = formData.get("old");
    const newCredential = formData.get("new");
    const repeatCredential = formData.get("repeat");

    const currentUser = await getCurrentUser();

    try {
      if (type === "email") {
        const { userEmail, error } = await updateEmail(
          currentUser.user,
          oldCredential,
          newCredential
        );
        if (error?.message) {
          setError(error.message);
          return;
        } else {
          window.location.href = "/account/user";
        }
      } else if (type === "password") {
        if (newCredential !== repeatCredential) {
          setError("New Password and Repeat Password don't match.");
          return;
        } else {
          const userData = await getUserInfo();
          const { data, error } = await updatePassword(
            userData.email,
            oldCredential,
            newCredential
          );
          if (error?.message) {
            setError(error.message);
            return;
          } else {
            window.location.href = "/account/user";
          }
        }
      } else if (type === "username") {
        const userData = await getCurrentUser();

        const { data, error } = await updateUsername(
          userData.user.id,
          oldCredential,
          newCredential
        );

        if (error?.message) {
          setError(error.message);
          return;
        } else {
          window.location.href = "/account/user";
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="animate-slideUpModal absolute z-20 bg-white shadow-md border border-black rounded-xl w-[30%] h-[40%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <p className="text-center mt-5 text-xl">Change {type}</p>
      <form
        onSubmit={(e) => handleUpdate(e, type)}
        className="flex flex-col justify-between h-[80%]"
      >
        <div className="flex flex-col justify-between items-center box-border">
          <div className=" flex flex-col mt-5 ">
            <label>Old {type}</label>
            <input
              name="old"
              className="w-[100%] border border-black rounded-md"
            />
          </div>
          <div className="flex flex-col mt-2">
            <label>New {type}</label>
            <input
              name="new"
              className="w-[100%] border border-black rounded-md"
            />
          </div>
          {type === "password" && (
            <div className=" flex flex-col">
              <label>Repeat New {type}</label>
              <input
                name="repeat"
                className="w-[100%] border border-black rounded-md"
              />
            </div>
          )}
        </div>
        <div className="flex justify-around">
          <button
            onClick={() => onClose()}
            className="border border-black rounded-md bg-red-500 pl-1 pr-1"
          >
            Cancel
          </button>
          <button className="border border-black rounded-md bg-green-500 pl-1 pr-1">
            Update {type}
          </button>
        </div>
        <p className="text-center text-red-500 font-medium">
          {error !== null && error}
        </p>
      </form>
    </div>
  );
}

export default UserInfoUpdater;
