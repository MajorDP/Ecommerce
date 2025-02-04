import Image from "next/image";
import bgImg from "@/public/bg-1.jpg";

import { Bakbak_One } from "next/font/google";
import Link from "next/link";

const font = Bakbak_One({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata = {
  title: {
    template: "%s - Ecoms",
    default: "Welcome - Ecoms",
  },
  description:
    "Browse all kinds of products ranging from everyday appliances to uncommon solutions to problems",
};

export default function Home() {
  return (
    <main className="">
      <div className="bg-gradient-to-r from-slate-50 to-slate-200 h-screen ">
        <div className="w-[70%] m-auto pt-5 flex justify-center align-middle">
          <div className="md:w-[50%] m-auto flex flex-col">
            <p
              className={`md:text-7xl animate-slideFromLeft  z-0 text-center text-4xl ${font.className}`}
            >
              Everything <br />
              You Need
            </p>
            <Link
              href="/browse?sortBy=newest"
              className="animate-slideFromLeftSlow font-medium text-sm bg-sky-100 text-center border border-black rounded-sm md:w-[40%] w-[60%] p-1.5 md:ml-24 mt-3 m-auto shadow-xl hover:bg-sky-200 hover:shadow-3xl hover:scale-110 duration-300"
            >
              See newest products
            </Link>
            <Link
              href="/browse?sortBy=rating"
              className="animate-slideFromLeft font-medium text-sm bg-sky-100 text-center border border-black rounded-sm md:w-[40%] w-[60%]  p-1.5 md:ml-24 mt-3 m-auto shadow-xl hover:bg-sky-200 hover:shadow-3xl hover:scale-110 duration-300"
            >
              See popular products
            </Link>
            <Link
              href="/browse?sortBy=onSale"
              className="animate-slideUp font-medium text-sm bg-sky-100 text-center border border-black rounded-sm  md:w-[40%] w-[60%]  p-1.5 md:ml-24 mt-3 m-auto shadow-xl hover:bg-sky-200 hover:shadow-3xl hover:scale-110 duration-300"
            >
              See products on sale
            </Link>
          </div>
          <Image
            src={bgImg}
            alt="aa"
            className="hidden md:block animate-slideUp object-contain m-auto border border-black rounded-full p-5 bg-white"
          />
        </div>
      </div>
    </main>
  );
}
