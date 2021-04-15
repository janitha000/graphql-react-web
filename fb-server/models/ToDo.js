const { model, Schema } = require('mongoose')

const todoSchema = new Schema({
    title: String,
    content: String,
    isCompleted: Boolean,
    createdAt: Date,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})

module.exports = model('ToDo', todoSchema)