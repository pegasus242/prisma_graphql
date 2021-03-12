import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateAddressInput {
  @Field()
  addressLine1: string

  @Field()
  addressLine2: string
}


