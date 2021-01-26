const Post = require('../models/Post')

module.exports = class PostDAO {

    constructor() { }

    getAllPosts = async () => {
        const posts = await Post.find();
        return posts;
    }


}

