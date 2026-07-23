const express = require("express");
const dotenv = require("dotenv");
dotenv.config(); // <--- ĐƯA LÊN DÒNG ĐẦU TIÊN ĐỂ LOAD BIẾN MÔI TRƯỜNG TRƯỚC TIÊN!

const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const YAML = require("yaml");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const file = fs.readFileSync(path.resolve("./swagger.yaml"), "utf8");
const swaggerDocument = YAML.parse(file);
const firebase = require("firebase-admin");
const serviceAccount = require("../firebaseConfig.json");
const socketModule = require("./socket");
const http = require("http");

const app = express();
const server = http.createServer(app);

socketModule.initialize(server);

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
});

const port = process.env.PORT || 3001;

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors({
  origin: "http://localhost:3000", // 👈 Đổi thành đúng URL/Port của Frontend đang chạy
  credentials: true,             // 👈 Bắt buộc phải có true thì trình duyệt mới chịu nhận Cookie
}));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(bodyParser.json());
app.use(cookieParser());

// Đăng ký các routes
routes(app);

// === THÊM GLOBAL ERROR HANDLER Ở ĐÂY ĐỂ BẮT SỐNG MỌI LỖI TỪ MULTER/CLOUDINARY ===
app.use((err, req, res, next) => {
  console.log("🔥 [GLOBAL ERROR HANDLER TỪ SERVER]:", err);
  if (err && err.stack) {
    console.log("🔥 STACK TRACE:", err.stack);
  }

  return res.status(500).json({
    status: "Error",
    message: err.message || "Lỗi server nội bộ",
    details: String(err),
  });
});

mongoose
  .connect(`${process.env.MONGO_DB}`)
  .then(() => {
     console.log("Connect Db success!");
  })
  .catch((err) => {
     console.log(err);
  });

server.listen(port, () => {
  console.log("Server is running in port: ", +port);
});