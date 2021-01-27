const postResolvers = require('./postResolver')
const userResolvers = require('./userResolver.js')
const commentResolvers = require('./commentResolver')

module.exports = {
    Query: {
        ...postResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation, ...postResolvers.Mutation, ...commentResolvers.Mutation
    }
}