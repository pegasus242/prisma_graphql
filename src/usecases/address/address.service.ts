import { UserService } from '../user/user.service'
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { User } from '@prisma/client'
import * as dotenv from 'dotenv'
import { CreateAddressInput } from '../../entities/address/create_address.input'
import { UpdateAddressInput } from '../../entities/address/update_address.input'
dotenv.config()


@Injectable()
export class AddressService {



  private readonly addressIncludes = {
    user: true,
  }

  //Get Addresss 
  constructor(private readonly data: UserService) {}
  public addresses():any {
    return this.data.address.findMany({ include: this.addressIncludes })
  }


  //Get Address by id
  public async getAddress(user:User):Promise<any> {

    const address = await this.data.address.findUnique({
      where: { userId:user.id },
      include: this.addressIncludes,
    })

    console.log(address)

  //If no address found, return exception
    if (!address) {
      throw new NotFoundException(`Address not found!`)
    }
    return address
  }


  //Create Address by id
  public async createAddress(user:User, input: CreateAddressInput):Promise<any> {


    const found = await this.data.address.findUnique({
      where: { userId:user.id },
      include: this.addressIncludes,
    })

    if (found) {
    throw new BadRequestException(`Address already exists!`)
    }

    const created = this.data.address.create({
      data: {
          ...input,
        user: {connect: {id: user.id}}
        },
      })

      return created
            

  }


  //Update Address by id
  public async updateAddress(user: User, input: UpdateAddressInput):Promise<any> {
    
    const address = await this.data.address.findUnique({
      where: { userId:user.id },
      include: this.addressIncludes,
    })


    return this.data.address.update({
      where: { id: address.id },
      data: { ...input },
    })
  }


  //Delete Address
  public async deleteAddress(user: User):Promise<any> {

    const address = await this.data.address.findUnique({
      where: { userId:user.id },
      include: this.addressIncludes,
    })

    const deleted = await this.data.address.delete({
      where: {
        id: address.id,
      },
    })
    return !!deleted
  }
}



