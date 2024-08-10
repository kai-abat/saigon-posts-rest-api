const Post = require("../models/postModel");

const createPost = async (req, res) => {
  try {
    console.log("req:", req.title, req.post, req.bucket);
    const newPost = new Post(req.body);
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchAllPost = async (req, res) => {
  try {
    const postFound = await Post.find();
    if (!postFound || postFound.length === 0) {
      return res.status(404).json({ message: `No posts found.` });
    }
    res.status(200).json(postFound);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchPostById = async (req, res) => {
  try {
    const id = req.params.id;
    const postFound = await Post.findById(id);
    if (!postFound) {
      return res.status(404).json({ message: `ID ${id} not found` });
    }
    res.status(200).json(postFound);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const id = req.params.id;

    let updatedPost = await Post.findByIdAndUpdate(id, req.body);
    if (!updatedPost) {
      return res
        .status(404)
        .json({ message: `Cannot find any Post with an ID of ${id}` });
    }
    updatedPost = await Post.findById(id);
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    await Post.findByIdAndDelete(id);
    res.status(200).json({ result: `The ID ${id} is successfuly deleted` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  fetchAllPost,
  fetchPostById,
  updatePost,
  deletePost,
};
