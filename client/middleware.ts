import { clerkMiddleware } from "@clerk/nextjs/server";
import { createRouteMatcher } from "@clerk/nextjs/server";

// Định nghĩa các route được bảo vệ
const isProtectedRoute = createRouteMatcher([
  "/protected(.*)",
  "/homepage(.*)",
  "/movie(.*)",
  "/tv-shows(.*)",
  "/tv(.*)",
  "/genre(.*)",
  "/viewmore(.*)",
  // Thêm các protected route khác nếu cần
]);

// Định nghĩa các route công khai
const publicRoutes = [
  "/",
  "/sign-in",
  "/sign-up",
  "/api/webhooks/clerk",
  "/api/test-insert",
  "/api/hello",
  "/api/users",
  "/api/gmail",
  "/api/chat",
] as const;

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    (await auth()).protect();
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
