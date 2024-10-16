import express from "express";
import Blog from "../models/Blog.js";
import authenticate from "../middlewares/authenticate.js";


const router = express.Router();

// Get all blogs
router.get("/blogs", async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new blog
router.post("/blogs", authenticate, async (req, res) => {
    const { title, content, fullContent, image, author } = req.body;
    const blog = new Blog({ title, content, fullContent, image, author });
    try {
        const savedBlog = await blog.save();
        res.status(201).json(savedBlog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a blog
router.put("/blogs/:id", authenticate, async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(id, updates, { new: true });
        res.json(updatedBlog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a blog
router.delete("/blogs/:id", authenticate, async (req, res) => {
    const { id } = req.params;
    try {
        await Blog.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
