const PostDAO = require('../dao/postDAO')
const postDAO = new PostDAO()

const resolvers = {
    Query: {
        helloWorld: () => "Hello from the server",
        async getPosts() {
            return postDAO.getAllPosts()
        }
    }
}

module.exports = resolvers