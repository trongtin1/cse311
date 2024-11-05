"use client"; // Đảm bảo chạy trên client-side
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Thêm trạng thái để theo dõi thông báo lỗi

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Kiểm tra nếu người dùng bỏ trống email hoặc password
    // if (!email || !password) {
    //   setError("Vui lòng nhập đầy đủ thông tin tài khoản và mật khẩu.");
    //   return;
    // }

    try {
      const response = await axios.post("http://localhost:8080/login", {
        email,
        password,
      });

      const { EC, EM, access_token, user } = response.data;
      if (EC === 0) {
        console.log("Đăng nhập thành công:", user);

        router.push("/"); // Điều hướng về trang chính
      } else {
        setError(EM); // Hiển thị thông báo lỗi từ phản hồi của server
      }
    } catch (error) {
      setError("Đăng nhập thất bại. Vui lòng thử lại.");
      console.error("Đăng nhập thất bại:", error);
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen h-screen p-8">
      {/* Background Image */}
      {/* <div className="absolute inset-0 -z-10 shadow-2xl">
        <Image
          src="/background.jpg"
          alt="Background"
          fill
          className="object-cover rounded-lg"
          priority
        />
      </div> */}

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
            className="w-full bg-red-600 h-12 text-white rounded mt-5 cursor-pointer hover:bg-red-700"
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
