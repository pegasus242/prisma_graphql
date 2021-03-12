import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { User } from '../../entities/user/user.type'
import { CtxUser } from '../auth/decorators/ctx-user.decorator'
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard'


import { UserService } from './user.service'

@Resolver()
export class UserResolver {
  constructor(private readonly service: UserService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [User], { nullable: true })
  Users(@CtxUser() user: User) {
    return this.service.users()
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { nullable: true })
  getUser(@CtxUser() user: User) {
    return this.service.getUser(user)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean, { nullable: true })
  deleteUser(@CtxUser() user: User) {
    return this.service.deleteUser(user)
  }
}


