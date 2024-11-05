"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserProfile = () => {
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedName = sessionStorage.getItem("name");
    const currentPath = window.location.pathname;

    if (!storedName) {
      toast.warning("Cần phải đăng nhập");
      // router.push("/login");
    } else if (currentPath === "/register") {
    } else {
      setUserName(storedName);
    }
  }, [router]);

  return (
    <div>
      {userName && (
        <div>
          <h2>Hello, {userName}!</h2>
        </div>
      )}
      <ToastContainer /> {/* Thêm ToastContainer để hiển thị thông báo */}
    </div>
  );
};

export default UserProfile;
