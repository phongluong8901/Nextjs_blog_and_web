const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const User = require("./models/UserModel");
const Role = require("./models/RoleModel");
const bcrypt = require("bcrypt");
const { CONFIG_PERMISSIONS } = require("./configs");

const initializeDB = async () => {
  try {
    console.log("Đang kết nối tới MongoDB...");
    await mongoose.connect(process.env.MONGO_DB);
    console.log("Kết nối DB thành công!");

    // 1. Kiểm tra hoặc tạo Role Admin
    let roleAdmin = await Role.findOne({ name: "Admin" });
    if (!roleAdmin) {
      roleAdmin = new Role({
        name: "Admin",
        permissions: [CONFIG_PERMISSIONS?.ADMIN || "all"],
      });
      await roleAdmin.save();
      console.log("Đã tạo Role: Admin");
    } else {
      console.log("Role Admin đã tồn tại.");
    }

    // 2. Kiểm tra hoặc tạo Role Basic
    let roleBasic = await Role.findOne({ name: "Basic" });
    if (!roleBasic) {
      roleBasic = new Role({
        name: "Basic",
        permissions: [CONFIG_PERMISSIONS?.BASIC || "read"],
      });
      await roleBasic.save();
      console.log("Đã tạo Role: Basic");
    } else {
      console.log("Role Basic đã tồn tại.");
    }

    // 3. Tạo tài khoản Admin mặc định
    const existingUser = await User.findOne({ email: "admin@gmail.com" });
    if (!existingUser) {
      const hash = bcrypt.hashSync("123456789Kha@", 10);
      const defaultUser = new User({
        email: "admin@gmail.com",
        password: hash,
        role: roleAdmin._id,
      });
      await defaultUser.save();
      console.log("Đã tạo tài khoản Admin thành công: admin@gmail.com");
    } else {
      console.log("Tài khoản admin@gmail.com đã tồn tại.");
    }

    await mongoose.connection.close();
    console.log("Đã đóng kết nối cơ sở dữ liệu. Hoàn tất!");
    process.exit(0);
  } catch (error) {
    console.error("Lỗi khi khởi tạo database:", error);
    process.exit(1);
  }
};

initializeDB();