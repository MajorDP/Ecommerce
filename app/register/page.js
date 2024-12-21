"use client";
import Image from "next/image";
import Link from "next/link";
import RegisterForm from "../_components/_userAuth/RegisterForm";

function Page() {
  return (
    <div className=" rounded-3xl p-4 bg-slate-300 flex flex-col items-center w-[50%] m-auto ">
      <p className="text-xl p-5 font-medium">Create a new account</p>
      <RegisterForm />
      <form>
        <button className="mt-3 p-1 border border-black rounded-md flex items-center gap-2 bg-slate-200">
          <Image
            src="https://authjs.dev/img/providers/google.svg"
            alt="Google logo"
            height="24"
            width="24"
          />
          Sign in with Google account
        </button>
      </form>
      <Link href="/login" className="pt-3">
        Already have an account?
      </Link>
    </div>
  );
}

export default Page;
