import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await axios.post("http://localhost:8080/login", {
            email: credentials?.email,
            password: credentials?.password,
          });

          const { EC, DT } = response.data;

          if (EC === 0 && DT) {
            return {
              id: DT._id,
              email: DT.email,
              name: DT.name,
              image: DT.photo,
            };
          }
          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/error",
  },
  callbacks: {
    async signIn({ user, account }) {
      const userData = {
        userData: {
          email: user.email,
          name: user.name,
          photo: user.image,
          provider: account?.provider,
          providerId: user.id,
        },
      };
      console.log(userData);
      try {
        // Check if user exists
        const checkResponse = await axios.post("http://localhost:8080/login", {
          email: user.email,
        });
        console.log(checkResponse.data);
        if (checkResponse.data.EC === 1) {
          console.log("New user - redirecting to register");
          return "/register";
        } else if (checkResponse.data) {
          console.log("login success");
          return true;
        }
      } catch (error) {
        console.error("Sign in error:", error);
        return false;
      }
      return false;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
        token.provider = account?.provider;
      }
      return token;
    },
    async session({ session, token }) {
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/homepage")) {
        return `${baseUrl}/homepage`;
      }
      if (url.startsWith("/register")) {
        return `${baseUrl}/register`;
      }
      if (url.startsWith(baseUrl)) return url;
      return baseUrl;
    },
  },
});
