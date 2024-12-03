"use client"; // Đảm bảo chạy trên client-side
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { useTranslation } from "react-i18next";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Biến trạng thái để lưu thông báo lỗi
  const router = useRouter(); // Sử dụng useRouter để điều hướng
  const { t ,i18n} = useTranslation('login');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setErrorMessage(t("login.invalid_email_password"));
        return;
      }

      if (result?.ok) {
        setErrorMessage("");
        window.location.href = "/homepage";
      }
    } catch (error) {
      console.error("Login failed::", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  // Hàm thay đổi email
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrorMessage(""); // Xóa thông báo lỗi khi thay đổi email
  };

  // Hàm thay đổi password
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorMessage(""); // Xóa thông báo lỗi khi thay đổi password
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen h-screen p-8">
      {/* Form Container */}
      <div className="w-full max-w-md bg-black/75 rounded p-16 z-10">
        <h1 className="text-2xl font-medium mb-7 text-white"> {t('login.log_in')}</h1>
        {/* Hiển thị thông báo lỗi nếu có */}
        {errorMessage && (
          <div className="bg-red-600 text-white p-3 rounded mb-5 text-center">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full h-12 bg-gray-800 text-white mb-3 p-4 rounded outline-none"
            value={email}
            onChange={handleEmailChange} // Sử dụng hàm handleEmailChange
          />
          <input
            type="password"
            placeholder={t('login.password')}
            className="w-full h-12 bg-gray-800 text-white mb-3 p-4 rounded outline-none"
            value={password}
            onChange={handlePasswordChange} // Sử dụng hàm handlePasswordChange
          />
          <button
            type="submit"
            className={`w-full bg-red-600 h-12 text-white rounded mt-5 cursor-pointer hover:bg-red-700 ${
              !email || !password ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!email || !password} // Disable nếu chưa nhập đủ thông tin
          >
          {t('login.log_in')}
            
          </button>
          <div className="mt-8 text-gray-400 text-sm">
            <p>
              {t('login.Log_in_with_socialMedia')}{" "}
              <Link href="/social-login" className="text-white hover:underline">
              {t('login.Log_in_with_Google_Github')}
                
              </Link>
            </p>
          </div>
          <div className="mt-8 text-gray-400 text-sm">
            <p>
              {t('login.dont_have_account')}{" "}
              <Link href="/register" className="text-white hover:underline">
              {t('login.sign_up_now')}
              </Link>
            </p>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-400 mt-4">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="w-4 h-4" />
              <label htmlFor="remember">{t('login.remember_me')}</label>
            </div>
            <p>{t('login.need_help')}</p>
          </div>
        </form>
        <div className="mt-10 text-gray-500">
          <p>
         {" "}
          
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
