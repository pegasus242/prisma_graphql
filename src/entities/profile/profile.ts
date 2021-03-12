//import { User } from '@beehive/auth'
import { Field, ObjectType } from '@nestjs/graphql'
import { User } from '../user/user.type'



@ObjectType()
export class Profile {
  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  firstname?: string

  @Field({ nullable: true })
  lastname?: string

  @Field({ nullable: true })
  phonenumber?: string

  @Field({ nullable: true })
  Email?: string

  @Field({ nullable: true })
  user?: User

}




