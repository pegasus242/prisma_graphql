import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { User } from '../../entities/user/user.type'
import { Profile } from '../../entities/profile/profile'
import { CtxUser } from '../auth/decorators/ctx-user.decorator'
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard'
import { ProfileService } from './profile.service'
import { CreateProfileInput } from '../../entities/profile/create_profile.input'
import { UpdateProfileInput } from '../../entities/profile/update_profile.input'


@Resolver()
export class ProfileResolver {
  constructor(private readonly service: ProfileService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Profile], { nullable: true })
  Profiles(@CtxUser() user: User) {
    return this.service.profiles()
  }
  
  @UseGuards(GqlAuthGuard)
  @Query(() => Profile, { nullable: true })
  getProfile(@CtxUser() user: User) {
    return this.service.getProfile(user)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Profile, { nullable: true })
  createProfile(@CtxUser() user: User, @Args('input') input: CreateProfileInput) {
    return this.service.createProfile(user, input)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Profile, { nullable: true })
  updateProfile(@CtxUser() user: User, @Args('input') input: UpdateProfileInput) {
    return this.service.updateProfile(user, input)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean, { nullable: true })
  deleteProfile(@CtxUser() user: User) {
    return this.service.deleteProfile(user)
  }
  
}


