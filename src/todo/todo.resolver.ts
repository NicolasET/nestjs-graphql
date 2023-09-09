import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { Todo } from './entities/todo.entity';
import { CreateTodoInput, UpdateTodoInput, StatusArg } from './dto';
import { AggregationType } from './types/aggregation.type';

@Resolver()
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [Todo])
  findAll(@Args() statusArg: StatusArg): Todo[] {
    return this.todoService.findAll(statusArg);
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

  //Aggregations
  @Query(() => Int)
  totalTodos(): number {
    return this.todoService.totalTodos;
  }

  @Query(() => Int)
  completedTodos(): number {
    return this.todoService.completedTodos;
  }

  @Query(() => Int)
  uncompletedTodos(): number {
    return this.todoService.uncompletedTodos;
  }

  @Query(() => AggregationType)
  aggregations(): AggregationType {
    return {
      completed: this.todoService.completedTodos,
      pending: this.todoService.uncompletedTodos,
      total: this.todoService.totalTodos,
    };
  }
}
