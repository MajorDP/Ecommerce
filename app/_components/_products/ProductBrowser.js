import Link from "next/link";

function ProductBrowser({ component, message, type, showAll }) {
  return (
    <div className="w-full">
      <p className=" p-2 border sm:border-2 rounded-3xl m-auto mt-12 text-center text-md sm:text-xl font-medium flex flex-col items-center shadow-md">
        {message}
        {showAll === false && (
          <Link
            href={`/browse/?order=${type}`}
            className="border text-black border-black rounded-full ml-2 w-20 text-sm sm:text-xl  bg-orange-400 hover:bg-orange-500"
          >
            See All
          </Link>
        )}
      </p>
      {component}
    </div>
  );
}

export default ProductBrowser;
