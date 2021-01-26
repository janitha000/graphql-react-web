const UserDAO = require('../dao/userDAO')
const { getSignedKey } = require('../auth')
const { UserInputError } = require('apollo-server')
const { validateRegisterInput, validateLoginInput } = require('../util/validator')
const bcrypt = require('bcryptjs')

const userDAO = new UserDAO()

const resolvers = {
    Query: {

    },
    Mutation: {
        async register(_, { registerInput }) {

            const { errors, valid } = validateRegisterInput(registerInput)
            if (!valid) {
                throw new UserInputError('Bad Input', { errors })
            }

            const userFromDb = await userDAO.getUserByUserName(registerInput.username)
            if (userFromDb) {
                throw new UserInputError('User is already exist', {
                    errors: {
                        username: "This username is taken"
                    }
                })
            }

            const user = await userDAO.registerUser(registerInput)
            const token = getSignedKey(user);
            const response = { ...user, token }
            return response
        },

        async login(_, { loginInput }) {
            const { errors, valid } = validateLoginInput(loginInput)
            if (!valid) {
                throw new UserInputError('Bad Input', { errors })
            }

            const user = await userDAO.getUserByUserName(loginInput.username);
            console.log(user)
            if (!user) {
                throw new UserInputError("User not found", {
                    errors: "User not found"
                })
            }
            console.log(loginInput.password, user.password)
            const match = await bcrypt.compare(loginInput.password, user.password)
            if (!match) {
                throw new UserInputError("Wrong password", {
                    errors: "Wrong password"
                })
            }
            const token = getSignedKey(user);
            const response = { user, token }
            return response;
        }
    }
}

module.exports = resolvers