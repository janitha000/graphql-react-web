const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type Post{
        id: ID!
        body: String!
        username: String!
        createdAt: String
    }

    type User{
        id: ID!
        username: String!
        password: String!
        email: String!
        createdAt: String
    }

    input RegisterInput{
        username:String!, 
        password: String!, 
        email: String!
    }

    input LoginInput{
        username: String!
        password: String!
    }

    type Query{
        helloWorld: String!
        getPosts: [Post]
        getPost(postId:ID!): Post
    }

    type Mutation{
        register(registerInput: RegisterInput):RegisterResponse
        login(loginInput:LoginInput):RegisterResponse!
        createPost(body:String!): Post!
        deletePost(postID:ID!): String
    }

    type RegisterResponse{
        user: User
        token: String
    }

`

module.exports = typeDefs