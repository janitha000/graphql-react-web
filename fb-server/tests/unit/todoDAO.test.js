const ToDoDAO = require('../../dao/todoDAO')
const sinon = require('sinon')
const ToDo = require('../../models/ToDo');

let mockModel;
let todoDAO;


beforeAll(() => {
    mockModel = {
        save: sinon.spy(),
        find: sinon.spy()
    }
    todoDAO = new ToDoDAO(mockModel)
});

describe('Create ToDo items', () => {
    it.skip(' should fail if the title is not available', async () => {
        expect(() => todoDAO.createToDo(12, undefined, "cdsfdf")).toThrow()
    });
    it.skip(' should call mongoose save', async () => {
        todoDAO.createToDo("ddsa", "asdfsdf", "fasdfs")
        console.log(mockModel)
        expect(mockModel.save.calledOnce).toBe(true)
    });
    it(' should call mongoose save', async () => {
        let items = await todoDAO.getToDos()
        expect(mockModel.find.calledOnce).toBe(true)
        console.log(JSON.stringify(mockModel.find))
    });

});