const PostDAO = require('../dao/postDAO')
const { validateAuthenticatoin } = require('../auth');
const { UserInputError } = require('apollo-server');
const postDAO = new PostDAO()

const resolvers = {
    Mutation: {
        async createComment(_, { postId, body }, { user }) {
            const { username } = validateAuthenticatoin(user);

            if (body.trim() === '') {
                throw new UserInputError("Body cannot be empty", {
                    errors: {
                        body: "Invalid body. Body is empty"
                    }
                })
            }

            const post = await postDAO.createComment(postId, body, username)
            return post;
        },
        async deleteComment(_, { postId, commentId }, { user }) {
            const { username } = validateAuthenticatoin(user);

            const post = await postDAO.deleteComment(postId, commentId, username)
            return post;
        }
    }

}

module.exports = resolvers;