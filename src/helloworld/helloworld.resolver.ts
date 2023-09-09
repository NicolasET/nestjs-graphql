import { Float, Query, Resolver, Int, Args } from '@nestjs/graphql';

@Resolver()
export class HelloworldResolver {
  @Query(() => String)
  hellowWorld(): string {
    return 'Hola Mundo';
  }

  @Query(() => Float) //<--- GraphQL type
  randomNumber(): number /*<-- TypeScript type */ {
    return Math.random() * 100;
  }

  @Query(() => Int) //<--- GraphQL type
  numberBetweenTwoNumbers(
    @Args('to', { type: () => Int, nullable: true })
    to: number = 6,
  ): number /*<-- TypeScript type */ {
    return Math.floor(Math.random() * to);
  }
}
