const PostDAO = require('../dao/postDAO')
const { validateAuthenticatoin } = require('../auth')
const postDAO = new PostDAO()

const resolvers = {
    Query: {
        helloWorld: () => "Hello from the server",
        async getPosts() {
            return postDAO.getAllPosts()
        },

        async getPost(_, { postId }) {
            const post = await postDAO.getPostById(postId)
            if (!post) {
                throw new Error("Post not found")
            }
            return post
        }
    },
    Mutation: {
        async createPost(_, { body }, { user }) {
            console.log(user)
            validateAuthenticatoin(user);
            const post = await postDAO.createPost(body, user);
            return post;

        }
    }
}

module.exports = resolvers