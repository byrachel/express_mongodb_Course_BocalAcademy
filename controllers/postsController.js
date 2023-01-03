const dbLib = require('../lib/db');
const mongo = require("mongodb");

const postsController = {
    createPost : async(req, res) => {
        const { title, content, author, date } = req.body;
        if(!title || !content || !author || ! date) {
            res.status(422).json({message: "All fields are required."})
        };
        try {
            const db = dbLib.getDB();
            const collection = db.collection('posts'); 
            await collection.insertOne({
                title: title,
                content: content,
                author: author,
                date: date
            });
            res.status(201).json({message: "Great ! The post is created."});
        } catch(e) {
            res.status(500).json({ message: "An error occured. Post not created." });
        }
    },
    getPosts: async (req,res) => {
        try {
            const db = dbLib.getDB();
            const data = await db.collection('posts').find().toArray();
            res.status(200).json({ posts: data });
        } catch(e) {
            res.status(500).json({ message: "An error occured. Posts not found." });
        }
    },
    getPostById : async(req, res) => {
        const id = req.params.id;
        if(!id) {
            res.status(422).json({ message: "ID is required." });
        }
        try {
            const db = dbLib.getDB();
            const post = await db.collection('posts').findOne({_id: mongo.ObjectId(id)});
            res.status(200).json({ post: post });
        } catch(e) {
            res.status(422).json({ message: "Post not found." });
        }
    },
    deletePost : async(req, res) => {
        const id = req.params.id;
        if(!id) {
            res.status(422).json({ message: "ID is required." });
        }
        try {
            const db = dbLib.getDB();
            await db.collection('posts').deleteOne({_id: mongo.ObjectId(id)});
            res.status(200).json({ message: 'Post is deleted !' });
        } catch(e) {
            res.status(422).json({ message: "Post not found." });
        }
    },
}

module.exports = postsController;