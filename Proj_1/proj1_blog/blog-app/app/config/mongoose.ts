import mongoose from "mongoose";

// Tạo một biến trạng thái để lưu trữ cục bộ
let isConnected = false;

const connectDB = async () => {
  // Nếu đã kết nối rồi thì thoát luôn, mất 0ms, không chạy lại lệnh connect nữa
  if (isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(`${process.env.MONGO_DB}`);

    // Trạng thái 1 nghĩa là đã kết nối thành công tới MongoDB
    if (db.connections[0].readyState === 1) {
      isConnected = true;
      console.log("=== Khởi tạo kết nối DB thành công ===");
    }
  } catch (error) {
    console.error("Kết nối DB thất bại:", error);
    throw new Error("Database connection failed");
  }
};

export default connectDB;
