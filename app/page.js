import Image from "next/image";
import bgImg from "@/public/bg-1.jpg";

import { Bakbak_One } from "next/font/google";
import Link from "next/link";

const font = Bakbak_One({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Home() {
  return (
    <main className="">
      <div className="bg-gradient-to-r from-slate-50 to-slate-200 h-screen ">
        <div className="w-[70%] m-auto pt-5 flex justify-center align-middle">
          <div className="animate-slideUp w-[50%] m-auto flex flex-col">
            <p className={`z-0 text-center text-7xl ${font.className}`}>
              Everything <br />
              You Need
            </p>
            <Link
              href="/browse"
              className="font-medium text-sm bg-sky-100 text-center border border-black rounded-sm w-[40%] p-1.5 ml-24 mt-3 m-auto shadow-xl hover:bg-sky-200 hover:shadow-3xl hover:scale-110 duration-300"
            >
              Shop newest products
            </Link>
          </div>
          <Image
            src={bgImg}
            alt="aa"
            className="animate-slideUp object-contain m-auto border border-black rounded-full p-5 bg-white"
          />
        </div>
      </div>
    </main>
  );
}