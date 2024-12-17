import Link from "next/link";

function ToastMessage({ message, link = null, linkMessage = null }) {
  return (
    <div className="flex flex-col items-center text-sm">
      <p>{message}</p>
      {link !== null && (
        <Link
          className="hover:scale-110 hover:text-red-500 duration-100"
          href={link}
        >
          {linkMessage !== null && linkMessage}
        </Link>
      )}
    </div>
  );
}

export default ToastMessage;
