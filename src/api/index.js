import { v4 } from 'node-uuid';

//This is a fake in-memory implementation of something
//that would be implemented by calling a REST server.

const fakeDatabase = {
  todos: [
    {
      id: v4(),
      text: 'a',
      completed: true,
    },
    {
      id: v4(),
      text: 'b',
      completed: true,
    },
    {
      id: v4(),
      text: 'c',
      completed: true,
    },
    {
      id: v4(),
      text: 'd',
      completed: false,
    },
    {
      id: v4(),
      text: 'e',
      completed: false,
    },
    {
      id: v4(),
      text: 'f',
      completed: false,
    },
  ],
};

const delay =
  (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchTodos = (filter) =>
  delay(500).then(() => {
    switch(filter) {
      case 'all': {
        return fakeDatabase.todos;
      }
      case 'active': {
        return fakeDatabase.todos.filter(t => !t.completed);
      }
      case 'completed': {
        return fakeDatabase.todos.filter(t => t.completed);
      }
      default : {
        throw new Error(`Unknown filter: ${filter}`);
      }
    }
  });
