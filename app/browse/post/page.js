import CreateEditProductForm from "@/app/_components/CreateEditProductForm";
import { postProduct } from "@/app/_lib/_api/productServices";
import Link from "next/link";

function Page() {
  return (
    <div className="rounded-3xl p-6 bg-slate-300 w-[90%] m-auto sm:w-[95%] md:w-[90%] lg:w-[80%]">
      <p className="p-4 border-2 border-slate-400 rounded-3xl w-[80%] m-auto mt-6 mb-12 text-center text-xl font-medium shadow-md sm:w-[90%] md:w-[70%] lg:w-[50%]">
        List a product
      </p>
      <CreateEditProductForm />
    </div>
  );
}

export default Page;
