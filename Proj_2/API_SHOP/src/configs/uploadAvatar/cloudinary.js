const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Cấu hình tài khoản Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// === THÊM ĐOẠN LOG KIỂM TRA NÀY ===
cloudinary.api.ping((error, result) => {
  if (error) {
    console.error('❌ [CLOUDINARY] Kết nối thất bại! Kiểm tra lại API Key/Secret/Cloud Name:', error);
  } else {
    console.log('✅ [CLOUDINARY] Kết nối thành công tới cloud:', process.env.CLOUDINARY_CLOUD_NAME, result);
  }
});
// ===================================

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'nextjs_store_shop',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});

const uploadCloud = multer({ storage: storage });

module.exports = {
  uploadCloud,
  cloudinary,
};