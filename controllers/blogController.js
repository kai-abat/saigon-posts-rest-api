const Blog = require("../models/blogModel");

const blog_index = async (req, res) => {
  try {
    const blogsFound = await Blog.find();
    res.render("blogs/index", { title: "All Blogs", blogs: blogsFound });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const blog_details = async (req, res) => {
  try {
    const id = req.params.id;
    const blogFound = await Blog.findById(id);
    res.render("blogs/details", { blog: blogFound, title: "Blog Details" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const blog_create_get = (req, res) => {
  res.render("blogs/create", { title: "Create a new blog" });
};

const blog_create_post = async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.redirect("/blogs");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const blog_delete = async (req, res) => {
  try {
    const id = req.params.id;
    await Blog.findByIdAndDelete(id);
    res.status(200).json({ redirect: "/blogs" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
};
