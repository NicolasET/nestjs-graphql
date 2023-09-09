import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { Todo } from './entities/todo.entity';
import { CreateTodoInput, UpdateTodoInput } from './dto/inputs';

@Resolver()
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [Todo])
  findAll(): Todo[] {
    return this.todoService.findAll();
  }

  @Query(() => Todo) //<-- This can be null
  findOne(
    @Args('id', { type: () => Int })
    id: number,
  ): Todo {
    return this.todoService.findOne(id);
  }

  @Mutation(() => Todo)
  create(@Args('createTodoInput') createTodoInput: CreateTodoInput) {
    return this.todoService.create(createTodoInput);
  }

  @Mutation(() => Todo)
  update(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput) {
    return this.todoService.update(updateTodoInput);
  }

  @Mutation(() => Todo)
  remove(
    @Args('id', { type: () => Int })
    id: number,
  ) {
    return this.todoService.remove(id);
  }
}
