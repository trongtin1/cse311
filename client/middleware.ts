import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  // Danh sách các trang cần bảo vệ
  const protectedPaths = [
    "/homepage",
    "/movie",
    "/search",
    "/tv-shows",
    "/genre",
    "/viewmore",
  ];

  // Kiểm tra xem path hiện tại có nằm trong danh sách protected không
  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedPath && !token) {
    // Nếu không có token và đang truy cập trang protected
    // Redirect về trang login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Nếu đã đăng nhập và cố truy cập trang login/register
  if (
    token &&
    (request.nextUrl.pathname.startsWith("/login") ||
      request.nextUrl.pathname.startsWith("/register"))
  ) {
    return NextResponse.redirect(new URL("/homepage", request.url));
  }

  return NextResponse.next();
}

// Cấu hình các path cần apply middleware
export const config = {
  matcher: [
    "/homepage/:path*",
    "/movie/:path*",
    "/search/:path*",
    "/tv-shows/:path*",
    "/genre/:path*",
    "/viewmore/:path*",
    "/login",
    "/register",
  ],
};
