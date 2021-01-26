const User = require('../models/User')
const bcrypt = require('bcryptjs')


module.exports = class UserDAO {

    constructor() { }

    registerUser = async ({ username, password, email }) => {


        password = await bcrypt.hash(password, 12)

        const newUser = new User({
            username, password, email, createdAt: new Date()
        })
        const res = await newUser.save();

        const result = {
            user: { ...res._doc, id: res._id }
        }

        return result;
    }

    getUserByUserName = async (username) => {
        const user = await User.findOne({ username: username });
        return user;
    }


}

