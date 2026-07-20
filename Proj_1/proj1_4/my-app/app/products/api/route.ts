import { listProducts } from "@/app/data";
import { NextRequest, NextResponse } from "next/server";

export function GET() {
  const data = listProducts;
  //   return Response.json({ data }, { status: 201, statusText: "Success" });
  return NextResponse.json({ data }, { status: 201, statusText: "Success" });
}

export async function POST(req: NextRequest) {
  try {
    // 1. Phải có dấu ngoặc () sau json và dùng await
    const newProduct = await req.json();

    console.log("Dữ liệu nhận được:", newProduct);

    // 2. Thêm logic để đưa sản phẩm mới vào danh sách (tùy chọn)
    // Lưu ý: listProducts phải được khai báo bằng 'let' ở file data nếu muốn sửa đổi
    const itemToAdd = {
      ...newProduct,
      id: listProducts.length + 1, // Tạo ID tạm thời
    };
    listProducts.push(itemToAdd);

    // 3. Trả về danh sách mới hoặc sản phẩm vừa tạo
    return NextResponse.json(
      { data: listProducts },
      { status: 201, statusText: "Created Success" },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi định dạng JSON hoặc server" },
      { status: 400 },
    );
  }
}
