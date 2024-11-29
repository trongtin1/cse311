"use client";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import GenreNavigate from "./NavigationContainer";
import { Search, Bookmark } from "lucide-react";
import { useState } from "react";
import SearchModal from "./SearchModal";
import Image from "next/image";
import GenreDropDown from "./MOVIE/GenreDropDown";
import ProfileDropdown from "./ProfileDropdown";

const Header = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  if (status === "loading") return null;

  return (
    <>
      <div className="flex items-center justify-between p-5 bg-gradient-to-b from-[#12121299] to-transparent backdrop-blur-sm sticky z-50 top-0 w-full">
        {/* Logo */}
        <div className="flex items-center">
          <Link href={session ? "/homepage" : "/"}>
            <Image
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
              priority={true}
              className="cursor-pointer hover:opacity-80 transition-opacity"
            />
          </Link>
        </div>

        {session ? (
          <>
            {/* Navigation */}
            <div className="flex-1 flex justify-center items-center gap-8">
              <GenreNavigate />
            </div>

            {/* Right section */}
            <div className="flex items-center space-x-6">
              <Search
                className="h-6 w-6 text-white cursor-pointer hover:text-gray-300 transition-colors"
                onClick={() => setIsSearchOpen(true)}
              />
              <GenreDropDown />
              <Link href="/homepage">
                <Bookmark className="h-6 w-6 text-white cursor-pointer hover:text-gray-300 transition-colors" />
              </Link>
              <ProfileDropdown />
            </div>
          </>
        ) : (
          <div className="flex items-center space-x-4">
            <a
              href={pathname === "/login" ? "/register" : "/login"}
              className="text-white hover:text-gray-300 px-4 py-2 rounded-md border border-white/80 hover:border-white transition-colors"
            >
              {pathname === "/login" ? "Register" : "Sign in"}
            </a>
          </div>
        )}
      </div>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};

export default Header;
