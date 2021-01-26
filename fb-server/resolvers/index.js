const postResolvers = require('./postResolver')
const userResolvers = require('./userResolver.js')

module.exports = {
    Query: {
        ...postResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation, ...postResolvers.Mutation
    }
}