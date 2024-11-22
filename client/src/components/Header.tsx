"use client";
import { UserButton, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import GenreNavigate from "./NavigationContainer";
import { Search, Bookmark } from "lucide-react";
import { useState, useEffect } from "react";
import SearchModal from "./SearchModal";
import Image from "next/image";
import GenreDropDown from "./MOVIE/GenreDropDown";

const Header = () => {
  const { userId, isLoaded } = useAuth();
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push("/");
    }
  }, [isLoaded, userId, router]);

  if (!isLoaded) return null;

  return (
    <>
      <div className="flex items-center justify-between p-5 bg-gradient-to-b from-[#12121299] to-transparent backdrop-blur-sm sticky z-50 top-0 w-full">
        {/* Logo */}
        <div className="flex items-center">
          <Link href={userId ? "/homepage" : "/"}>
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

        {/* Hiển thị khác nhau dựa trên userId */}
        {userId ? (
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
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8 hover:opacity-80 transition-opacity",
                  },
                }}
              />
            </div>
          </>
        ) : (
          <div className="flex items-center space-x-4">
            <Link
              href="/sign-in"
              className="text-white hover:text-gray-300 px-4 py-2 rounded-md border border-white/80 hover:border-white transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="text-white hover:text-gray-300 px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 transition-colors"
            >
              Sign up
            </Link>
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
