import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from '../services/user.service';
import { User } from '../../../domain/user/entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async users() {
    return this.userService.findAll();
  }

  @Query(() => User)
  async user(@Args('id', { type: () => String }) id: string) {
    return this.userService.findById(id);
  }

  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserDto) {
    return this.userService.create(data);
  }

  @Mutation(() => User)
  async updateUser(@Args('id') id: string, @Args('data') data: UpdateUserDto) {
    return this.userService.update(id, data);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: string) {
    await this.userService.delete(id);
    return true;
  }
}
