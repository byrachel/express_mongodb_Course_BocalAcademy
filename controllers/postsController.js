const dbLib = require('../lib/db');
const mongo = require("mongodb");

const postsController = {
    createPost : async(req, res) => {
        const { title, content, author, date } = req.body;
        if(!title || !content || !author || ! date) {
            res.status(422).json({message: "All fields are required."})
        };
        const db = dbLib.getDB();
        const collection = db.collection('posts'); 
        await collection.insertOne({
            title: title,
            content: content,
            author: author,
            date: date
        });
        res.status(201).json({message: "Great ! The post is created."});
    },
    getPosts: async (req,res) => {
        const db = dbLib.getDB();
        const data = await db.collection('posts').find().toArray();
        res.status(200).json({ posts: data });
    },
    getPostById : async(req, res) => {
        const id = req.params.id;
        if(!id) {
            res.status(422).json({ message: "ID is required." });
        }
        const db = dbLib.getDB();
        const post = await db.collection('posts').findOne({_id: mongo.ObjectId(id)});
        res.status(200).json({ post: post });
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
            res.status(422).json({ message: "ID is required." });
        }
    },
}

module.exports = postsController;