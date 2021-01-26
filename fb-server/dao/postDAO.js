const Post = require('../models/Post')

module.exports = class PostDAO {

    constructor() { }

    getAllPosts = async () => {
        const posts = await Post.find();
        return posts;
    }

    getPostById = async (postId) => {
        const post = await Post.findById(postId)
        return post;
    }

    createPost = async (body, user) => {
        const newPost = new Post({
            body,
            user: user.id,
            username: user.username,
            createdAt: new Date().toISOString()
        })

        const post = await newPost.save();
        return post;
    }


}

