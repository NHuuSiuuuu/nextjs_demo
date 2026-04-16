import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const privatePaths = ["/me"];
const authPaths = ["/register", "/login"];

export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get("sessionToken")?.value;
  const pathName = request.nextUrl.pathname;

  // Check private - Chưa đăng nhâp thì không cho vào private path
  if (privatePaths.some((path) => pathName.startsWith(path)) && !sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Check đăng nhập ( đăng nhập rồi thì không cho vào login/register)
  if (authPaths.some((path) => pathName.startsWith(path)) && sessionToken) {
    return NextResponse.redirect(new URL("/me", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/me", "/register", "/login"],
};
