const ToDoDAO = require('../../dao/todoDAO');
const ToDo = require('../../models/ToDo');
const { setupDB } = require('../test-setup');
setupDB()


describe("should call to real database", () => {
    it('should call mongoose save', async () => {
        let dao = new ToDoDAO(ToDo)
        let input = {
            user: "6077a31bd03c6d21fcc219fe",
            title: 'sadfsd',
            content: "asfdfds"
        }
        await dao.createToDo(input)
    });
})