"use client"; // Đảm bảo chạy trên client-side
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // Sử dụng useRouter để điều hướng

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/login", {
        email,
        password,
      });

      const { EC, EM, access_token, user } = response.data; // Lấy thông tin từ phản hồi

      if (EC === 0) {
        // Đăng nhập thành công
        console.log("Đăng nhập thành công:", user);

        router.push("/"); // Điều hướng về trang chính
      } else {
        // Thất bại, hiển thị thông báo lỗi
        console.log(EM);
      }
    } catch (error) {
      console.error("Đăng nhập thất bại:", error);
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen h-screen p-8">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10 shadow-2xl">
        <Image
          src="/background.jpg"
          alt="Background"
          fill
          className="object-cover rounded-lg"
          priority
        />
      </div>

      {/* Form Container */}
      <div className="w-full max-w-md bg-black/75 rounded p-16 z-10">
        <h1 className="text-2xl font-medium mb-7 text-white">Log in</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full h-12 bg-gray-800 text-white mb-3 p-4 rounded outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full h-12 bg-gray-800 text-white mb-3 p-4 rounded outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className={`w-full bg-red-600 h-12 text-white rounded mt-5 cursor-pointer hover:bg-red-700 ${
              !email || !password ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!email || !password} // Disable nếu chưa nhập đủ thông tin
          >
            Log in
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
            <Link href="/register" className="text-white font-medium">
              Sign Up Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
