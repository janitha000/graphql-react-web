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
        async createPost(_, { body }, { user, pubsub }) {
            validateAuthenticatoin(user);
            const post = await postDAO.createPost(body, user);
            pubsub.publish('NEW_POST', {
                newPost: post
            })
            return post;
        },

        async deletePost(_, { postID }, { user }) {
            validateAuthenticatoin(user);
            const post = await postDAO.getPostById(postDAO)
            if (post.username === user.username) {
                const res = await postDAO.deletePost(postID);
                return res;
            }
            else {
                throw new Error("You are not authorized to delete the post")
            }
        },

        async likePost(_, postId, { user }) {
            const { username } = validateAuthenticatoin(user)

            const post = await postDAO.likePost(postId, username)
            return post;
        }
    },
    Subscription: {
        newPost: {
            subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_POST')
        }
    }
}

module.exports = resolvers