import Link from "next/link";
import RegisterForm from "../_components/_userAuth/RegisterForm";

function Page() {
  return (
    <div className=" rounded-3xl p-4 bg-slate-300 flex flex-col items-center w-[90%] sm:w-[50%] m-auto ">
      <p className="text-[1.2rem] sm:text-xl text-center p-5 font-medium">
        Create a new account
      </p>
      <RegisterForm />
      <Link href="/login" className="mt-3 text-sm">
        Already have an account?
      </Link>
    </div>
  );
}

export default Page;
