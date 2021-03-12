import { Injectable, Logger, NotFoundException, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { prisma, PrismaClient, User } from '@prisma/client'


@Injectable()
export class UserService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly defaultAdmin: {username: string, Email: string; password: string }

  constructor(private readonly config: ConfigService) {
    super()
    //this.defaultAdmin = this.config.get('admin')
  }

  public async onModuleDestroy() {
    await this.$disconnect()
  }

  public async onModuleInit() {
    await this.$connect()
    //await this.ensureAdminUser()
  }


  public users():any {
    return this.user.findMany()
  }


  async createUser({ username, password }: { username: string; password: string }):Promise<any>{
    console.log(this.user)
    return await this.user.create({
        data: {
            username ,
            password ,
        }
    })
}
  
  
  async findUserById(id: number):Promise<any> {
    return await this.user.findUnique({
      where: {
        id,
      },
    })
  }


  async getUser(user: User):Promise<any> {
    const found = await this.user.findUnique({
      where: {
        id:user.id,
      },
    })

    console.log(found)

    if (!found) {
      throw new NotFoundException(`User with id ${user.id} not found!`)
    }
    return found

    
  }


  //Delete User
  async deleteUser(user: User):Promise<any> {

  const deleted = await this.user.delete({
    where: {
    id: user.id,
    },
  })

  return !!deleted
}

}

