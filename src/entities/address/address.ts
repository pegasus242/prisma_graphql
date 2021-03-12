//import { User } from '@beehive/auth'
import { Field, ObjectType } from '@nestjs/graphql'
import { User } from '../user/user.type'



@ObjectType()
export class Address {
  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  addressLine1?: string

  @Field({ nullable: true })
  addressLine2?: string

  @Field({ nullable: true })
  user?: User

}




