import { listProducts } from "@/app/data";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ productId: string }> },
) {
  const { productId } = await params;
  const data = listProducts.find((item) => item.id === Number(productId));

  if (data) {
    return NextResponse.json({ data }, { status: 200 });
  }

  // return NextResponse.json(
  //   { data: { message: "The product does not exist" } },
  //   { status: 404 },
  // );

  //da ve ds neu khong tim thay id
  redirect("/products/api");
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ productId: string }> },
) {
  try {
    const { productId } = await params;

    // 1. Phải có dấu ngoặc () ở json()
    const updateProductData = await req.json();

    // 2. Dùng findIndex để lấy vị trí của sản phẩm trong mảng
    const index = listProducts.findIndex(
      (item) => item.id === Number(productId),
    );

    if (index !== -1) {
      // 3. Cập nhật các trường dữ liệu (Gộp dữ liệu cũ và mới)
      listProducts[index] = {
        ...listProducts[index],
        ...updateProductData,
        id: listProducts[index].id, // Đảm bảo ID không bị ghi đè lung tung
      };

      return NextResponse.json({
        data: {
          message: "Update Success",
          data: listProducts[index],
        },
      });
    }

    return NextResponse.json(
      { data: { message: "The product does not exist" } },
      { status: 404 },
    );
  } catch (error) {
    return NextResponse.json(
      { data: { message: "Invalid JSON or Server Error" } },
      { status: 400 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ productId: string }> },
) {
  try {
    const { productId } = await params;

    // 1. Tìm vị trí của sản phẩm
    const index = listProducts.findIndex(
      (item) => item.id === Number(productId),
    );

    if (index !== -1) {
      // 2. Xóa sản phẩm khỏi mảng
      const deletedItem = listProducts.splice(index, 1);

      return NextResponse.json({
        data: {
          message: "Delete Success",
          deletedItem: deletedItem[0], // Trả về thông tin món đồ vừa xóa
        },
      });
    }

    // 3. Nếu không tìm thấy
    return NextResponse.json(
      { data: { message: "The product does not exist to delete" } },
      { status: 404 },
    );
  } catch (error) {
    return NextResponse.json(
      { data: { message: "Server Error" } },
      { status: 500 },
    );
  }
}
