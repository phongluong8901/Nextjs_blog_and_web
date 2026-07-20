import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // Using an object inside the log for better readability
  console.log("through - middleware: ", {
    pathname,
    params: Object.fromEntries(searchParams),
  });

  // delete cokkie
  // const allCookies = req.cookies.getAll();
  // req.cookies.delete("city");
  // console.log({ check: req.cookies.has("name") });
  // console.log(allCookies);

  //set them cookie
  // const res = NextResponse.next();
  // res.cookies.set({
  //   name: "next",
  //   value: "14",
  //   path: "/",
  // });

  // return res;

  return new Response("Hello");

  // return NextResponse.next();
}

export const config = {
  matcher: ["/my-profile", "/my-profile/api", "/login"],
};
