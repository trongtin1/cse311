// "use client ";
import Image from "next/image";
import Link from "next/link";
import GenreNavigate from "../NavigationContainer";

const Header = () => {
  return (
    <div className="w-full flex items-center justify-between  p-5 bg-[#12121280] gap-4 md:gap-0 sticky z-50 top-0">
      {/* Logo */}
      {/* <Link href={"/"}>
        <Image
          src="https://i.ibb.co/ZW0SbjJ/logo-dark.png"
          alt="Logo"
          width={120}
          height={100}
          priority={true}
          className="cursor-pointer w-40 h-auto"
        />
      </Link> */}
      <div className="flex-1 flex justify-center">
        <GenreNavigate />
      </div>
      {/* Others */}
    </div>
  );
};

export default Header;
