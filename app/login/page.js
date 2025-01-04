import Link from "next/link";
import LoginForm from "../_components/_userAuth/LoginForm";

function Page() {
  return (
    <div className=" rounded-3xl p-4 bg-slate-300 flex flex-col items-center w-[90%] sm:w-[50%] m-auto ">
      <p className="text-[1.2rem] sm:text-xl text-center p-5 font-medium">
        Sign into an existing account
      </p>
      <LoginForm />
      <Link href="/register" className="mt-3 text-sm">
        Don&apos;t have have an account?
      </Link>
    </div>
  );
}

export default Page;
