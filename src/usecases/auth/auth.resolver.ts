import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { AuthRegisterInput } from '../../entities/auth/auth-register.input'
import { AuthLoginInput } from '../../entities/auth/auth-login.input'
import { UserToken } from '../../entities/user/user-token'
import { AuthService } from './auth.service'


@Resolver()
export class AuthResolver {
    constructor(private readonly service: AuthService) {}

  @Mutation(() => UserToken)
  login(@Args({ name: 'input', type: () => AuthLoginInput }) input: AuthLoginInput) {
    return this.service.login(input)
  }

  @Mutation(() => UserToken)
  register(@Args({ name: 'input', type: () => AuthRegisterInput }) input: AuthRegisterInput) {
    return this.service.register(input)
  }
}




