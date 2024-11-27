"use client";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";

const SocialLogin = () => {
  const handleProviderSubmit = async (provider: string) => {
    try {
      await signIn(provider, {
        callbackUrl: "/homepage",
        redirect: false,
      });
    } catch (error) {
      console.error(`${provider} sign in error:`, error);
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen h-screen p-8">
      <div className="w-full max-w-md bg-black/75 rounded p-16 z-10">
        <h1 className="text-2xl font-medium mb-7 text-white">Social Login</h1>

        <div className="space-y-4">
          <button
            onClick={() => handleProviderSubmit("google")}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-600 rounded text-sm font-medium text-white hover:bg-gray-800"
          >
            <Image
              src="/google.png"
              alt="Google"
              width={20}
              height={20}
              className="mr-2"
            />
            Log in withGoogle
          </button>

          <button
            onClick={() => handleProviderSubmit("github")}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-600 rounded text-sm font-medium text-white hover:bg-gray-800"
          >
            <Image
              src="/github.png"
              alt="Github"
              width={20}
              height={20}
              className="mr-2 brightness-0 invert"
            />
            Log in with Github
          </button>
        </div>

        <div className="mt-8 text-gray-400 text-sm">
          <p>
            Login in with email?{" "}
            <Link href="/login" className="text-white hover:underline">
              Log in now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocialLogin;
