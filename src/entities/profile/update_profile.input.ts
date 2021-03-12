import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateProfileInput {
  @Field()
  Email: string

  @Field()
  firstname: string

  @Field()
  lastname: string

  @Field()
  phonenumber: string

}