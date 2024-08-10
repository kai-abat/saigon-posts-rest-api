const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

// API

// Render Blog Create Page
router.get("/create", blogController.blog_create_get);

// Render Blog Page
router.get("/", blogController.blog_index);

// handle blog post request
router.post("/", blogController.blog_create_post);

// Render Blog Detail Page
router.get("/:id", blogController.blog_details);

// // fetch single blog
// router.get("/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const blog = await Blog.findById(id);
//     if (!blog || blog === null) {
//       return res
//         .status(404)
//         .json({ message: `Cannot find any prodyct with ID ${req.params.id}` });
//     }

//     res.status(200).json(blog);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// handle blog delete request
router.delete("/:id", blogController.blog_delete);

// router.get("/api", async (req, res) => {
//   try {
//     const blog = await Blog.find();
//     console.log("blog", blog);
//     res.status(200).json(blog);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

module.exports = router;
