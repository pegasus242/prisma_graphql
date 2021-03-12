import { Field, ObjectType } from '@nestjs/graphql'
import { User } from './user.type'

@ObjectType()
export class UserToken {
  @Field()
  id: number
  
  @Field()
  token: string

  @Field()
  user: User
}