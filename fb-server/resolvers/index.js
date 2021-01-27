const postResolvers = require('./postResolver')
const userResolvers = require('./userResolver.js')
const commentResolvers = require('./commentResolver')

module.exports = {
    Post: {
        commentsCount: (parent) => parent.comments.length,
        likesCount: (parent) => parent.likes.length
    },
    Query: {
        ...postResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation, ...postResolvers.Mutation, ...commentResolvers.Mutation
    },
    Subscription: {
        ...postResolvers.Subscription
    }
}