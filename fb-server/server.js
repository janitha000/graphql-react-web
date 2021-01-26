const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const jwt = require('express-jwt')

const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const { MONGO } = require('./config')
const mongoose = require('mongoose')

const app = express();
const JWT_SECRET = "janitha000"
const auth = jwt({ secret: JWT_SECRET, credentialsRequired: false, algorithms: ['sha1', 'RS256', 'HS256'] })
app.use(auth)

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const user = req.headers.user ? JSON.parse(req.headers.user)
            : req.user ? req.user : null

        return { user }
    },
    playground: { endpoint: '/graphql' }

})

server.applyMiddleware({ app })
const PORT = process.env.PORT || 3000;

mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    app.listen(PORT, () => {
        console.log("🚀 The server started on port " + PORT);
    });
})


