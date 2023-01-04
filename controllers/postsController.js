// const dbLib = require('../lib/db');
// const mongo = require("mongodb");
const Post = require("../schema/post");

const postsController = {
    createPost : async(req, res) => {
        const { title, content, author } = req.body;
        if(!title || !content || !author ) {
            res.status(422).json({message: "All fields are required."})
        };

        // WITH MONGODB VANILLA
        // try {
        //     const db = dbLib.getDB();
        //     const collection = db.collection('posts'); 
        //     await collection.insertOne({ title, content, author });
        // } catch(e) {
        //     res.status(500).json({ message: "An error occured. Post not created." });
        // }

        // WITH MONGOOSE
        const post = new Post({ title, content, author });
        post.save()
            .then(() =>  res.status(201).json({message: "Great ! The post is created."}))
            .catch(() => res.status(500).json({ message: "An error occured. Post not created." }))
    },
    getPosts: async (req,res) => {
        try {
            // WITH MONGODB VANILLA
            // const db = dbLib.getDB();
            // const data = await db.collection('posts').find().toArray();

            // WITH MONGOOSE
            const posts = await Post.find();
            res.status(200).json({ posts });
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
            // WITH MONGODB VANILLA
            // const db = dbLib.getDB();
            // const post = await db.collection('posts').findOne({_id: mongo.ObjectId(id)});
            
            // WITH MONGOOSE
            const post = await Post.findOne({ _id: id });
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
            // WITH MONGODB VANILLA
            // const db = dbLib.getDB();
            // await db.collection('posts').deleteOne({_id: mongo.ObjectId(id)});

            // WITH MONGOOSE
            await Post.deleteOne({ _id: id });
            res.status(200).json({ message: 'Post is deleted !' });
        } catch(e) {
            res.status(422).json({ message: "Post not found." });
        }
    },
}

module.exports = postsController;