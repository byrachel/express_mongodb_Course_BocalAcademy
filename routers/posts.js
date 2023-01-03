const express = require('express');
const router = express.Router();
const post = require("../controllers/postsController");

router.post('/post', post.createPost);
router.get('/posts', post.getPosts);
router.get('/post/:id', post.getPostById);
router.delete('/post/:id', post.deletePost);

module.exports = router;