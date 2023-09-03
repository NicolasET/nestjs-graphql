import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloworldResolver {
  @Query(() => String)
  hellowWorld(): string {
    return 'Hola Mundo';
  }
}
