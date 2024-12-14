import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";
import NavOptions from "./NavOptions";

function Navigation() {
  return (
    <header className="animate-slideDown bg-white relative w-[100%] p-4">
      <div className="flex justify-between w-[70%] m-auto">
        <div className="w-[20%] mr-[10%]">
          <Link href="/">
            <Image src={logo} alt="logo" width={150} height={150} />
          </Link>
        </div>
        <div className="flex justify-between gap-5 w-full sm:text-sm lg:text-xl">
          <Link className="underline-animation m-auto" href="/">
            Home
          </Link>
          <NavOptions />
        </div>
      </div>
    </header>
  );
}

export default Navigation;
