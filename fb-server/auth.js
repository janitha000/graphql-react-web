const jwt = require('jsonwebtoken')
const { AuthenticationError } = require('apollo-server')

const JWT_SECRET = "janitha000"

const getSignedKey = ({ id, username, email }) => {
    const token = jwt.sign({ id, email, username }, JWT_SECRET, { expiresIn: '1h' })
    return token;
}

const validateAuthenticatoin = (user) => {
    if (!user) {
        throw new AuthenticationError("User is not authenticated")
    }
    return user;
}


module.exports = {
    getSignedKey,
    validateAuthenticatoin
}