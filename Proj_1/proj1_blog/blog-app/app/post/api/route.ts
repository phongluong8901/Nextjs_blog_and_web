import Post from "@/app/config/models/Post";
import connectDB from "@/app/config/mongoose";
import { NextRequest, NextResponse } from "next/server";

// ==================== API TẠO MỚI POST ====================
export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const { title, description } = await req.json();
    console.log({ title, description });

    const existed = await Post.findOne({ title });

    if (!existed) {
      const newPost = await Post.create({ title, description });
      return NextResponse.json(
        {
          data: newPost,
          message: "Success",
        },
        { status: 201, statusText: "Created" },
      );
    } else {
      return NextResponse.json(
        {
          data: null,
          message: "The title post already exists",
        },
        { status: 400, statusText: "Invalid" },
      );
    }
  } catch (error) {
    console.error("Lỗi API POST:", error);
    return NextResponse.json(
      {
        data: null,
        message: "Internal Server Error",
      },
      { status: 500, statusText: "Failed" },
    );
  }
}

// ==================== API LẤY DANH SÁCH POST (PHÂN TRANG) ====================
export async function GET(req: NextRequest) {
  // SỬA 1: Đảm bảo luôn kết nối DB trước khi gọi truy vấn
  await connectDB();

  try {
    const limit = Number(req.nextUrl.searchParams.get("limit") ?? 5);
    const page = Number(req.nextUrl.searchParams.get("page") ?? 1);

    const totalPosts = await Post.countDocuments();
    const totalPage = Math.ceil(totalPosts / +limit);

    const allPosts = await Post.find()
      .skip((+page - 1) * +limit)
      .limit(+limit);

    return NextResponse.json(
      {
        data: allPosts,
        meta: {
          totalPage,
          totalCount: totalPosts,
        },
        message: "Success",
      },
      // SỬA 2: Trả về 200 thay vì 210/201 cho method GET
      { status: 200 },
    );
  } catch (error) {
    console.error("Lỗi API GET:", error);
    return NextResponse.json(
      {
        data: null,
        message: "Internal Server Error",
      },
      // SỬA 3: Trả về status 500 cho lỗi Server phát sinh ở catch
      { status: 500, statusText: "Failed" },
    );
  }
}
