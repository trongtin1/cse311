// "use client";

// import { signIn, useSession } from "next-auth/react";
// import { useEffect } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// const RegisterPage = () => {
//   const { data: session } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     const registerUser = async () => {
//       if (session?.user) {
//         try {
//           const userData = {
//             userData: {
//               email: session.user.email,
//               name: session.user.name || "",
//               firstName: session.user.name?.split(" ")[0] || "",
//               lastName: session.user.name?.split(" ").slice(1).join(" ") || "",
//               photo: session.user.image,
//               provider: "google",
//               providerId: session.user.id,
//             },
//           };

//           const response = await axios.post(
//             "http://localhost:8080/register",
//             userData
//           );

//           if (response.data.success) {
//             router.push("/homepage");
//           }
//         } catch (error) {
//           console.error("Registration error:", error);
//         }
//       }
//     };

//     registerUser();
//   }, [session]);

//   const handleSignIn = async () => {
//     try {
//       await signIn("google", {
//         redirect: true,
//         callbackUrl: "/payment", // This will redirect back to this page after Google auth
//       });
//     } catch (error) {
//       console.error("Sign in error:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 space-y-6">
//         <div className="text-center space-y-2">
//           <h1 className="text-2xl font-bold text-gray-900">Register</h1>
//           <p className="text-gray-500">
//             Please register with your Google account
//           </p>
//         </div>

//         <button
//           onClick={handleSignIn}
//           className="w-full flex items-center justify-center gap-3 px-4 py-4 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//         >
//           <img src="/google.png" alt="Google logo" className="w-6 h-6" />
//           <span>Register with Google</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;
