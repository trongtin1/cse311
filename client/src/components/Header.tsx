"use client";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import GenreNavigate from "./NavigationContainer";
import { Search, Bookmark } from "lucide-react";
import { useState, useEffect } from "react";
import SearchModal from "./SearchModal";
import Image from "next/image";
import GenreDropDown from "./MOVIE/GenreDropDown";
import ProfileDropdown from "./ProfileDropdown";
import "../i18n/i18n";
import { useTranslation } from "react-i18next";
import { locales } from "../i18n/i18n";

const Header = () => {
  const { t, i18n } = useTranslation('home');
  const currentLanguage = locales[i18n.language as keyof typeof locales];

  const { data: session, status } = useSession();
  const pathname = usePathname();

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    // Khôi phục ngôn ngữ từ localStorage khi tải trang
    const savedLanguage = localStorage.getItem("language") || "";
    i18n.changeLanguage(savedLanguage);
  }, [i18n]);

  if (status === "loading") return null;

  const changeLanguage = (lng: "en" | "vn") => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng); // Lưu ngôn ngữ vào localStorage
  };

  return (
    
      <><div className="flex items-center justify-between p-5 bg-gradient-to-b from-[#12121299] to-transparent backdrop-blur-sm sticky z-50 top-0 w-full">
      {/* Logo */}
      <div className="flex items-center">
        <Link href={session ? "/homepage" : "/"}>
          <Image
            src="/logo.png"
            alt="Logo"
            width={40}
            height={40}
            priority={true}
            className="cursor-pointer hover:opacity-80 transition-opacity" />
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
              onClick={() => setIsSearchOpen(true)} />
            <GenreDropDown />
            <Link href="/homepage">
              <Bookmark className="h-6 w-6 text-white cursor-pointer hover:text-gray-300 transition-colors" />
            </Link>
            <ProfileDropdown />
          </div>
        </>
      ) : (
        <div className="flex items-center space-x-4">
          {/* <div style={{ padding: "20px" }}>
            
              <select
                onChange={(e) => changeLanguage(e.target.value as "en" | "vi")}
                value={i18n.language} // Hiển thị ngôn ngữ hiện tại
                style={{
                  padding: "10px",
                  fontSize: "16px",
                  border: "0.5px solid white", // Viền trắng
                  background: "transparent", // Nền trong suốt
                  color: "white", // Màu chữ
                  borderRadius: "4px", // Bo góc
                  appearance: "none", // Loại bỏ kiểu mặc định
                }}
              >
                <option value="en">English</option>
                <option value="vi">Tiếng Việt</option>
              </select>
            </div> */}
          <a
            href={pathname === "/login" ? "/register" : "/login"}
            className="text-white hover:text-gray-300 px-4 py-2 rounded-md border border-white/80 hover:border-white transition-colors"
          >
             {pathname === "/login" ? t("home.register") : t("home.login")}
          </a>
        </div>
      )}
    </div><SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)} /></>
   
  );
};

export default Header;
