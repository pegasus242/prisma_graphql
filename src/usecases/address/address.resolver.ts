import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { User } from '../../entities/user/user.type'
import { Address } from '../../entities/address/address'
import { CtxUser } from '../auth/decorators/ctx-user.decorator'
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard'
import { AddressService } from './address.service'
import { CreateAddressInput } from '../../entities/address/create_address.input'
import { UpdateAddressInput } from '../../entities/address/update_address.input'


@Resolver()
export class AddressResolver {
  constructor(private readonly service: AddressService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Address], { nullable: true })
  Addresses(@CtxUser() user: User) {
    return this.service.addresses()
  }
  
  @UseGuards(GqlAuthGuard)
  @Query(() => Address, { nullable: true })
  getAddress(@CtxUser() user: User) {
    return this.service.getAddress(user)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Address, { nullable: true })
  createAddress(@CtxUser() user: User, @Args('input') input: CreateAddressInput) {
    return this.service.createAddress(user, input)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Address, { nullable: true })
  updateAddress(@CtxUser() user: User, @Args('input') input: UpdateAddressInput) {
    return this.service.updateAddress(user, input)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean, { nullable: true })
  deleteAddress(@CtxUser() user: User) {
    return this.service.deleteAddress(user)
  }
  
}


