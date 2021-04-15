const postResolvers = require('./postResolver')
const userResolvers = require('./userResolver.js')
const commentResolvers = require('./commentResolver')
const todoResolvers = require('./todoResolver')
const dateScaler = require('../scalers/dateScaler')

module.exports = {
    Post: {
        commentsCount: (parent) => parent.comments.length,
        likesCount: (parent) => parent.likes.length
    },
    Query: {
        ...postResolvers.Query, ...todoResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation, ...postResolvers.Mutation, ...commentResolvers.Mutation, ...todoResolvers.Mutation
    },
    Subscription: {
        ...postResolvers.Subscription
    },
    Date: dateScaler
}