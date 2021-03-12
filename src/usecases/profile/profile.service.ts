import { UserService } from '../user/user.service'
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { User } from '@prisma/client'
import * as dotenv from 'dotenv'
import { CreateProfileInput } from '../../entities/profile/create_profile.input'
import { UpdateProfileInput } from '../../entities/profile/update_profile.input'
dotenv.config()


@Injectable()
export class ProfileService {



  private readonly profileIncludes = {
    user: true,
  }

  //Get Profiles 
  constructor(private readonly data: UserService) {}
  public profiles():any {
    return this.data.profile.findMany({ include: this.profileIncludes })
  }


  //Get Profile by id
  public async getProfile(user:User):Promise<any> {

    const profile = await this.data.profile.findUnique({
      where: { userId:user.id },
      include: this.profileIncludes,
    })

    console.log(profile)

  //If no profile found, return exception
    if (!profile) {
      throw new NotFoundException(`Profile not found!`)
    }
    return profile
  }


  //Create Profile by id
  public async createProfile(user:User, input: CreateProfileInput):Promise<any> {


    const found = await this.data.profile.findUnique({
      where: { userId:user.id },
      include: this.profileIncludes,
    })

    if (found) {
    throw new BadRequestException(`Profile already exists!`)
    }

    const created = this.data.profile.create({
      data: {
          ...input,
        user: {connect: {id: user.id}}
        },
      })

      return created
            

  }


  //Update Profile by id
  public async updateProfile(user: User, input: UpdateProfileInput):Promise<any> {
    
    const profile = await this.data.profile.findUnique({
      where: { userId:user.id },
      include: this.profileIncludes,
    })


    return this.data.profile.update({
      where: { id: profile.id },
      data: { ...input },
    })
  }


  //Delete Profile
  public async deleteProfile(user: User):Promise<any> {

    const profile = await this.data.profile.findUnique({
      where: { userId:user.id },
      include: this.profileIncludes,
    })

    const deleted = await this.data.profile.delete({
      where: {
        id: profile.id,
      },
    })
    return !!deleted
  }
}



