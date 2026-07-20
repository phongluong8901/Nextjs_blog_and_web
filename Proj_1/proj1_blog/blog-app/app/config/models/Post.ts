import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
  },
  { timestamps: true },
);

// Nếu model "Post" đã tồn tại thì dùng lại, chưa có mới tạo mới
const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);

export default Post;
