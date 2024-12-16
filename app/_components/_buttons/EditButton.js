import Link from "next/link";

function EditButton({ productId }) {
  return (
    <Link
      href={`/browse/product/edit/${productId}`}
      className="border border-black rounded-md bg-orange-300 p-2 w-14 mt-2 hover:bg-orange-400 hover:text-white hover:scale-110 duration-100"
    >
      Edit
    </Link>
  );
}

export default EditButton;
