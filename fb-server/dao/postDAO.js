const { UserInputError, AuthenticationError } = require('apollo-server');
const { validateAuthenticatoin } = require('../auth');
const Post = require('../models/Post')

module.exports = class PostDAO {

    constructor() { }

    getAllPosts = async () => {
        const posts = await Post.find().sort({ createdAt: -1 });
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

    deletePost = async (postId) => {
        const res = await Post.deleteOne({ _id: postId })
        return true;
    }

    createComment = async (postId, body, username) => {
        const post = await this.getPostById(postId)
        if (post) {
            post.comments.unshift({
                body,
                username,
                createdAt: new Date().toISOString()
            })
            await post.save();
            return post;
        }
        else {
            throw new UserInputError("No post found")
        }
    }

    deleteComment = async (postId, commentId, username) => {
        const post = await this.getPostById(postId)
        if (post) {
            const commentIndex = post.comments.findIndex(x => x.id === commentId);
            if (post.comments[commentIndex].username === username) {
                post.comments.splice(commentIndex, 1)
                await post.save()
                return post;
            }
            else {
                throw new AuthenticationError("You are not authenticated to remove this comment")
            }

        } else {
            throw new UserInputError("No post found")
        }
    }

    likePost = async ({ postId }, username) => {
        const post = await this.getPostById(postId)
        if (post) {
            console.log(post)
            if (post.likes.find(like => like.username === username)) {
                post.likes = post.likes.filter(like => like.username !== username)
            }
            else {
                post.likes.push({
                    username,
                    createAt: new Date().toISOString()
                })
            }
            console.log(post)
            await post.save()
            return post;

        } else {
            throw new UserInputError("No post found")
        }
    }


}

