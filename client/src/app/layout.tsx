// app/layout.tsx


import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import AuthPageCheck from "@/components/AuthPageCheck";
import { redirect } from "next/navigation";


const inter = Inter({ subsets: ["latin"] });




export const metadata: Metadata = {
  title: "Movie Streaming Studio",
  description: "An application for your favorite movies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //redirect("/login");
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="w-full h-screen flex-col">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* <Header /> */}
            <AuthPageCheck>
              {children}
            </AuthPageCheck>
            {/* <Footer /> */}
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
}
