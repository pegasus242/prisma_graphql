import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class User {
  @Field({ nullable: true })
  id: number

  @Field()
  username: string

  password: string
}




