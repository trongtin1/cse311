"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import "../i18n/i18n";

const Footer = () => {

  const { t ,i18n} = useTranslation('home'); // Specify the namespace if needed
  const changeLanguage = (lng: "en" | "vn") => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng); // Lưu ngôn ngữ vào localStorage
  };

  return (
    <div className="bg-[#191919] px-10 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          {/* Questions Section */}
          <div>
            <h2 className="text-[#FF0000] text-2xl mb-6 uppercase font-bold">
              {t("home.movie_website")}
            </h2>
            <p className="text-gray-400">{t("home.bringing_cinema_to_home")}</p>
          </div>

          {/* EXPLORE Column */}
          <div>
            <h3 className="text-white uppercase font-bold mb-6">{t("home.explore")}</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white underline">
            
                {t("home.help_center")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white underline">
                  {t("home.account")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white underline">
                  {t("home.blog")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white underline">
                  {t("home.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="text-white uppercase font-bold mb-6">{t("home.legal")}</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white underline">
                  {t("home.cookies_preferences")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white underline">
                  {t("home.privacy_policy")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white underline">
                  {t("home.terms_of_use")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white underline">
                  {t("home.legal_notices")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="text-white uppercase font-bold mb-6">{t("home.support")}</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white underline">
                  {t("home.faq")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white underline">
                  {t("home.speed_test")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white underline">
                  {t("home.contact_us")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Language Selector */}
        <div className="mt-16">
          <select
            onChange={(e) => changeLanguage(e.target.value as "en" | "vn")}
            value={i18n.language}
            className="bg-transparent text-gray-400 border border-gray-700 rounded px-4 py-2"
          >
            <option value="en">English</option>
            <option value="vn">Tiếng Việt</option>
          </select>
        </div>

        {/* Copyright */}
        <div className="mt-16 flex flex-col md:flex-row justify-between text-gray-400 text-sm">
          <p>© 2024 | {t("home.online_movie_streaming")}</p>
          {/* <p>{t("site_created_by")} 3 Members</p> */}
        </div>
      </div>
    </div>
  );
};

export default Footer;
