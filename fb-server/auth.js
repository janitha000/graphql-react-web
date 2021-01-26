const jwt = require('jsonwebtoken')

const JWT_SECRET = "janitha000"

const getSignedKey = ({ id, username, email }) => {
    const token = jwt.sign({ id, email, username }, JWT_SECRET, { expiresIn: '1h' })
    return token;
}

module.exports = {
    getSignedKey
}