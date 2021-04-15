const { gql } = require('apollo-server-express')

const typeDefs = gql`
    scalar Date

    type Post{
        id: ID!
        body: String!
        username: String!
        createdAt: String
        comments: [Comment]
        likes: [Like]
        commentsCount: Int!
        likesCount: Int!
    }

    type ToDo {
        id: ID!,
        title: String!,
        content: String!,
        user: String!
        createdAt: Date!
    }

    type Comment{
        id: ID!
        body: String!
        username: String!
        createdAt: String!
    }

    type Like{
        id: ID!
        username: String!
        createdAt: String!
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
        getToDos:[ToDo]
    }

    type Mutation{
        register(registerInput: RegisterInput):RegisterResponse
        login(loginInput:LoginInput):RegisterResponse!
        createPost(body:String!): Post!
        deletePost(postID:ID!): String
        createComment(postId:String!, body:String!):Post!
        deleteComment(postId:String!, commentId:String!):Post!
        likePost(postId:String!):Post!
        createToDo(title:String!, content:String!): ToDo!
        
    }

    type RegisterResponse{
        user: User
        token: String
    }

    type Subscription{
        newPost: Post!
    }

`

module.exports = typeDefs