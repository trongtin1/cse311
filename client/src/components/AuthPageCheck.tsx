// components/AuthPageCheck.tsx

"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeaderLogin from "@/components/HeaderLogin"

export default function AuthPageCheck({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAuthPage = pathname === "/login" || pathname === "/register";

    return (
        <>
            {isAuthPage ? <HeaderLogin /> : <Header />}
            {children}
            <Footer />
        </>
    );
}
