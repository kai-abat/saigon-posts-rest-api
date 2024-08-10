const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

// handle Creating new Post Requests
router.post("/", postController.createPost);

// handle fetch all Post Request
router.get("/", postController.fetchAllPost);

// handle fetch 1 Post Request
router.get("/:id", postController.fetchPostById);

// handle Update existing Post Requests
router.put("/:id", postController.updatePost);

// handle Delete existing Post Requests
router.delete("/:id", postController.deletePost);

module.exports = router;
