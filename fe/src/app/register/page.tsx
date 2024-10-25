"use client";
import Link from "next/link"; // Use Link from next/link for routing
import Image from "next/image";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn reload trang

    try {
      const checkUser = await axios.post("http://localhost:8080/check", {
        email,
      });
      console.log(checkUser.data);

      if (checkUser.data) {
        alert("Email đã tồn tại. Vui lòng sử dụng email khác.");
        return;
      }

      const paymentResponse = await axios.post(
        "http://localhost:8080/payment",
        {
          name,
          email,
          password,
        }
      );

      console.log(paymentResponse.data);
      // Kiểm tra phản hồi từ server
      if (paymentResponse.data.data.return_code === 1) {
        // window.location.href = paymentResponse.data.order_url;
        console.log("Payment initiated. Waiting for success...");
        // Đợi trạng thái thanh toán cập nhật thành công
        const app_trans_id = paymentResponse.data.app_trans_id;
        const appTransId = localStorage.getItem("app_trans_id");
        console.log(app_trans_id);
        if (paymentResponse.data.data.return_code === 1) {
          window.location.href = paymentResponse.data.data.order_url;
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // const checkResponse = await axios.post(
  //   `http://localhost:8080/check-status-order/${appTransId}`, // Thay thế appTransId trực tiếp vào URL
  //   {}
  // );
  // if (checkResponse.data.return_code === 1) {
  //   console.log("Payment successful. Registering user...");

  //   // Nếu thanh toán thành công, lưu thông tin đăng ký
  //   const registerResponse = await axios.post(
  //     "http://localhost:8080/register",
  //     {
  //       name,
  //       email,
  //       password,
  //     }
  //   );
  //   console.log(registerResponse.data);
  // } else {
  //   console.error("Payment failed or still processing.");
  // }
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
        <h1 className="text-2xl font-medium mb-7 text-white">Sign up</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            className="w-full h-12 bg-gray-800 text-white mb-3 p-4 rounded outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
              !name || !email || !password
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={!name || !email || !password} // Disable if fields are empty
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
              className="text-white font-medium cursor-pointer"
            >
              Log In Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
