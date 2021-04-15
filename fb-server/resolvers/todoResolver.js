const { validateAuthenticatoin } = require("../auth");
const ToDoDAO = require('../dao/todoDAO');
const ToDo = require("../models/ToDo");

const todoDAO = new ToDoDAO(ToDo);

const resolvers = {
    Query: {
        async getToDos(_, { }, { user }) {
            const todoItems = await todoDAO.getToDos();
            return todoItems
        }
    },
    Mutation: {
        async createToDo(_, { title, content }, { user }) {
            const { id } = validateAuthenticatoin(user)
            console.log(id)
            const todo = await todoDAO.createToDo({ user: id, title, content })
            return todo;

        }
    }
}

module.exports = resolvers