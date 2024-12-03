// src/i18n/i18n.ts

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HOME_EN from "../locales/en/home.json";
import login_EN from "../locales/en/login.json";
import register_EN from "../locales/en/register.json";
import genres_EN from "../locales/en/genres.json";
import HOME_VN from "../locales/vn/home.json";
import login_VN from "../locales/vn/login.json";
import register_VN from "../locales/vn/register.json";
import genres_VN from "../locales/vn/genres.json";

export const locales = {
  en: "English",
  vn: "Tiếng Việt",
};

const resources = {
  en: {
    home: HOME_EN,
    login: login_EN,
    register: register_EN,
    genres: genres_EN,
  },
  vn: {
    home: HOME_VN,
    login: login_VN,
    register: register_VN,
    genres:genres_VN
  },
};

const defaultNS = "home";

// Lấy ngôn ngữ đã lưu trong localStorage hoặc mặc định là "en"
const savedLanguage = typeof window !== "undefined" ? localStorage.getItem("language") || "en" : "en";

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage, // Sử dụng ngôn ngữ đã lưu hoặc mặc định
    ns: ["home", "login", "register", "genres"],
    defaultNS,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // React đã tự escape các giá trị
    },
    react: {
      useSuspense: false, // Tùy chọn, có thể bật nếu sử dụng Suspense
    },
  });

export default i18n;
