"use client";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputChange =
    (setter: (value: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      setError(""); // Xóa thông báo lỗi khi người dùng nhập
    };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn hành động mặc định của form

    try {
      const checkUser = await axios.post("http://localhost:8080/check-user", {
        email,
      });
      if (checkUser.data.EC === 1) {
        setError("Email already exists");
        return;
      }
      const response = await axios.post("http://localhost:8080/payment", {
        userData: {
          name,
          email,
          password,
        },
      });

      if (response.data.resultCode === 0) {
        window.location.href = response.data.shortLink;
      } else {
        setError(response.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError(
        error.response?.data?.EM || "An error occurred during registration"
      );
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen h-screen p-8">
      <div className="w-full max-w-md bg-black/75 rounded p-16 z-10">
        <h1 className="text-2xl font-medium mb-7 text-white">Sign up</h1>

        {/* Hiển thị thông báo lỗi nếu có */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            className="w-full h-12 bg-gray-800 text-white mb-3 p-4 rounded outline-none"
            value={name}
            onChange={handleInputChange(setName)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full h-12 bg-gray-800 text-white mb-3 p-4 rounded outline-none"
            value={email}
            onChange={handleInputChange(setEmail)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full h-12 bg-gray-800 text-white mb-3 p-4 rounded outline-none"
            value={password}
            onChange={handleInputChange(setPassword)}
            required
          />
          <button
            type="submit"
            className={`w-full bg-red-600 h-12 text-white rounded mt-5 cursor-pointer hover:bg-red-700 ${
              !name || !email || !password
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={!name || !email || !password}
          >
            Sign up
          </button>
          <div className="flex justify-between items-center text-sm text-gray-400 mt-4">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="w-4 h-4" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <p>Need help?</p>
          </div>
        </form>
        <div className="mt-10 text-gray-500">
          <p>
            I have an account{" "}
            <Link
              href="/login"
              className="text-white font-medium cursor-pointer hover:underline"
            >
              Log In Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
