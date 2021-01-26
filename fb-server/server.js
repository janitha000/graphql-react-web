const express = require('express')
const { ApolloServer } = require('apollo-server-express')

const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const { MONGO } = require('./config')
const mongoose = require('mongoose')

const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: { endpoint: '/graphql' }

})

server.applyMiddleware({ app })
const PORT = process.env.PORT || 3000;

mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    app.listen(PORT, () => {
        console.log("🚀 The server started on port " + PORT);
    });
})


