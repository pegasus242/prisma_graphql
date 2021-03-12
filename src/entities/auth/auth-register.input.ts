import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AuthRegisterInput {
  @Field()
  username: string

  @Field()
  password: string
}