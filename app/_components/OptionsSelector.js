"use client";

function OptionsSelector({ options, setOptions }) {
  if (options.length === 0) return <div></div>;

  return (
    <div className="grid grid-cols-2 border border-slate-400 rounded-md px-4 py-2 shadow-sm w-full focus:ring-2 focus:ring-slate-500 focus:outline-none transition overflow-y-scroll h-[20rem]">
      {options.map((option, index) => (
        <div
          key={option.index} // Use a unique ID as the key
          className="flex flex-col w-[90%] h-[20rem] justify-center"
        >
          <div className="flex flex-col">
            <div className="flex flex-row justify-between mb-1">
              <label
                htmlFor={`type${index}`}
                className="mb-2 text-slate-700 font-medium"
              >
                Type
              </label>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  //filtering out the removed option and resetting indexes
                  setOptions((prevOptions) => {
                    const newOptions = prevOptions.filter(
                      (currOption) => currOption.index !== option.index
                    );

                    return newOptions.map((opt, idx) => ({
                      ...opt,
                      index: idx,
                    }));
                  });
                }}
                className="bg-red-400 px-3 py-0 border border-slate-400 rounded-md"
              >
                X
              </button>
            </div>
            <input
              id={`type${index}`}
              name="type"
              type="text"
              placeholder="red..."
              className="border border-slate-400 rounded-md px-4 py-2 shadow-sm focus:ring-2 focus:ring-slate-500 focus:outline-none transition w-full"
              value={option.type || ""}
              onChange={(e) => {
                setOptions((prevOptions) =>
                  prevOptions.map((currOption, idx) =>
                    idx === index
                      ? { ...currOption, type: e.target.value }
                      : currOption
                  )
                );
              }}
            />
          </div>
          <div className="flex flex-col pt-2">
            <label htmlFor="img" className="mb-2 text-slate-700 font-medium">
              Image
            </label>
            <div className="w-[100%] h-[10rem] flex flex-col items-center justify-center">
              <label
                htmlFor={`typeImg${index}`}
                className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-slate-400 rounded-lg p-10 shadow-sm bg-slate-100 cursor-pointer"
              >
                {option.img ? (
                  <img
                    src={
                      typeof option.img === "string"
                        ? option.img
                        : URL.createObjectURL(option.img)
                    }
                    alt="Preview"
                    className="w-full h-full object-contain object-center rounded-md"
                  />
                ) : (
                  <span className="text-slate-500 text-center">
                    Upload image
                  </span>
                )}
                <input
                  id={`typeImg${index}`}
                  name={`typeImg${index}`}
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file && file.type.startsWith("image/")) {
                      setOptions((prevOptions) =>
                        prevOptions.map((opt) =>
                          opt.index === option.index
                            ? { ...opt, img: file }
                            : opt
                        )
                      );
                    } else {
                      alert("Please upload a valid image file.");
                    }
                  }}
                  accept="image/*"
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OptionsSelector;
