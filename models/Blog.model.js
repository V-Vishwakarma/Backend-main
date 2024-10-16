import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  fullContent: { type: String, required: true },
  image: { type: String, required: true },
  author: { type: String, required: true },
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
