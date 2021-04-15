const { UserInputError } = require("apollo-server-errors")
const ToDo = require("../models/ToDo")

module.exports = class ToDoDAO {
    TODO;

    constructor(todoModel) {
        this.TODO = todoModel
    }

    createToDo = async ({ user, title, content }) => {
        if (!(user && title && content))
            throw new UserInputError("Parameters are missing")

        const newTodo = new this.TODO({
            title, content, user, createdAt: new Date(), isCompleted: false
        })

        const todo = await newTodo.save();
        return todo;
    }

    getToDos = async () => {

        const todoItems = await this.TODO.find({})
        return todoItems;
    }
}