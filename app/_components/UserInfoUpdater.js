"use client";
function UserInfoUpdater({ type, userId, onClose }) {
  return (
    <div className="animate-slideUpModal absolute z-20 bg-white shadow-md border border-black rounded-xl w-[30%] h-[40%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <p className="text-center mt-5 text-xl">Change {type}</p>
      <div className="flex flex-col justify-between h-[80%]">
        <div className="flex flex-col justify-between items-center box-border">
          <div className=" flex flex-col mt-5 ">
            <label>Old {type}</label>
            <input className="w-[100%] border border-black rounded-md" />
          </div>
          <div className="flex flex-col mt-2">
            <label>New {type}</label>
            <input className="w-[100%] border border-black rounded-md" />
          </div>
          {type === "password" && (
            <div className=" flex flex-col">
              <label>Repeat New {type}</label>
              <input className="w-[100%] border border-black rounded-md" />
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
      </div>
    </div>
  );
}

export default UserInfoUpdater;
