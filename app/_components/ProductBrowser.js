import Link from "next/link";

function ProductBrowser({ component, message, type, showAll }) {
  return (
    <div className="w-full">
      <p className=" p-2 border-2 rounded-3xl m-auto mt-12 text-center text-xl font-medium flex flex-col items-center">
        {message}
        {showAll === false && (
          <Link
            href={`/browse/${type}`}
            className="border border-black rounded-md ml-2 w-20 bg-orange-300"
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
