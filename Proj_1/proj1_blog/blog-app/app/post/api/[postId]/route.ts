import Post from "@/app/config/models/Post";
import connectDB from "@/app/config/mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ postId: string }> },
) {
  await connectDB();

  try {
    const { postId } = await context.params;
    const post = await Post.findById(postId);

    if (!post) {
      return NextResponse.json(
        {
          data: null,
          message: "The post does not exist",
        },
        { status: 404, statusText: "Not Found" },
      );
    }

    // SỬA Ở ĐÂY: Trả về post thay vì null
    return NextResponse.json(
      {
        data: post,
        message: "Success",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Lỗi API GET:", error);
    return NextResponse.json(
      {
        data: null,
        message: "Internal Server Error",
      },
      { status: 500, statusText: "Failed" },
    );
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ postId: string }> },
) {
  await connectDB();

  try {
    const { title, description } = await req.json();
    const { postId } = await context.params;
    const id = postId;

    const post = await Post.findById(id);
    if (!post) {
      return NextResponse.json(
        {
          data: null,
          message: "The post is not existed",
        },
        { status: 400, statusText: "Failed" },
      );
    }
    const existedTitle = await Post.findOne({ title, _id: { $ne: id } });
    if (!existedTitle) {
      const updated = await Post.findByIdAndUpdate(id, { title, description });

      return NextResponse.json(
        {
          data: updated,
          message: "Success",
        },
        { status: 201 },
      );
    }
  } catch (error) {
    console.error("Lỗi API GET:", error);
    return NextResponse.json(
      {
        data: null,
        message: "Internal Server Error",
      },
      { status: 500, statusText: "Failed" },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ postId: string }> },
) {
  await connectDB();

  try {
    const { title, description } = await req.json();
    const { postId } = await context.params;
    const id = postId;

    const post = await Post.findById(id);
    if (!post) {
      return NextResponse.json(
        {
          data: null,
          message: "The post is not existed",
        },
        { status: 400, statusText: "Failed" },
      );
    }

    const deletedPost = await Post.findByIdAndDelete(id);

    return NextResponse.json(
      {
        data: deletedPost,
        message: "Success",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Lỗi API GET:", error);
    return NextResponse.json(
      {
        data: null,
        message: "Internal Server Error",
      },
      { status: 500, statusText: "Failed" },
    );
  }
}
