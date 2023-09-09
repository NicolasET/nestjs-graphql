import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { CreateTodoInput } from './dto/inputs/create-todo.input';
import { UpdateTodoInput } from './dto/inputs';
import { StatusArg } from './dto/args/status.arg';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    {
      id: 0,
      description: 'Terminar curso',
      done: false,
    },
    {
      id: 1,
      description: 'Sacar a Max',
      done: true,
    },
    {
      id: 2,
      description: 'Obtener piedra del espacio',
      done: true,
    },
    {
      id: 3,
      description: 'Obtener piedra del poder',
      done: false,
    },
    {
      id: 4,
      description: 'Obtener piedra del alma',
      done: false,
    },
  ];

  get totalTodos() {
    return this.todos.length;
  }

  get completedTodos() {
    return this.todos.filter((todo) => todo.done === true).length;
  }

  get uncompletedTodos() {
    return this.todos.filter((todo) => todo.done === false).length;
  }

  findAll(statusArg: StatusArg): Todo[] {
    const { status } = statusArg;
    if (status !== undefined) {
      return this.todos.filter((todo) => todo.done === status);
    }

    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((item) => item.id === id);
    if (!todo) {
      throw new NotFoundException(`Todo with ID: ${id} not found`);
    }

    return todo;
  }

  create(createTodoInput: CreateTodoInput): Todo {
    const todo = new Todo();
    todo.description = createTodoInput.description;
    todo.id = Math.max(...this.todos.map((todo) => todo.id), 0) + 1;

    this.todos.push(todo);

    return todo;
  }

  update(updateTodoInput: UpdateTodoInput): Todo {
    const { id, description, done } = updateTodoInput;
    const todoToUpdate = this.findOne(id);

    if (description) {
      todoToUpdate.description = description;
    }

    if (done !== undefined) {
      todoToUpdate.done = done;
    }

    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        return todoToUpdate;
      }

      return todo;
    });

    return todoToUpdate;
  }

  remove(id: number): Todo {
    const todo = this.findOne(id);

    this.todos.splice(this.todos.indexOf(todo), 1);

    return todo;
  }
}
