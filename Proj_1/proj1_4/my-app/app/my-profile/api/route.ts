import { NextRequest, NextResponse } from "next/server";
import { cookies, headers } from "next/headers";

export async function GET(req: NextRequest) {
  // Cách 1: Lấy từ đối tượng Request (Chuẩn Web API)
  const reqHeaders = req.headers; // req.headers vốn đã là một Headers object, không cần 'new Headers()'
  const token1 = reqHeaders.get("Authorization");

  // Cách 2: Lấy thông qua Helper headers() của Next.js
  // ✅ Cần thêm async/await cho bản Next.js mới nhất
  const headerList = await headers();
  const token2 = headerList.get("Authorization");

  const cookieStore = await cookies();
  const nameCookie = cookieStore.get("name");

  console.log("token", { token: token1 });
  console.log("token_2", { token: token2 });
  console.log("cookie", { cookie: nameCookie?.value });

  //   return new NextResponse("My profile of me");

  return new NextResponse("<h1> My profile of me html</h1>", {
    headers: {
      "Content-Type": "text/html",
      "Set-Cookie": "name=lttd, city=html",
    },
  });
}
