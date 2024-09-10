import Image from "next/image";
import Link from "next/link";

function Page() {
  return (
    <div className=" rounded-3xl p-4 bg-slate-300 flex flex-col items-center w-[50%] m-auto ">
      <p className="text-xl p-5 font-medium">Sign into an existing account</p>
      <form className="m-auto  flex flex-col border-2 border-black rounded-xl p-5 text-xl">
        <div className="flex flex-col items-center mb-2">
          <label htmlFor="email">Email</label>
          <input id="email" className="" />
        </div>
        <div className="flex flex-col justify-center items-center">
          <label htmlFor="password">Password</label>
          <input id="password" className="" />
        </div>
        <button className="border-2 border-black rounded-md bg-orange-300 mt-5 w-[50%] m-auto text-xl">
          Register
        </button>
      </form>
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
      <Link href="/login" className="mt-3">
        Don&apos;t have have an account?
      </Link>
    </div>
  );
}

export default Page;
