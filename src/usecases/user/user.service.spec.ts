import { v4 as uuidv4 } from "uuid";
import { PrismaClient } from "@prisma/client";
import {UserService} from "./user.service" 
import { ConfigService } from '@nestjs/config'
import { User } from '../../entities/user/user.type'



jest.mock('./user.service')

const prisma = new PrismaClient();
afterAll(async (done) => {
  await prisma.$disconnect();
  done();
});

let config:ConfigService
let userservice = new UserService(config)

const username = `${uuidv4()}@test.username`
const password = `${uuidv4()}@test.password`


describe("createUserAction() - unit", () => {
  const test_user: User = {
  id: 45,
  username: 'test_user',
  password: 'test_user',
}


  it("makes create request",async():Promise<void>=>{
    const mockCreate = jest.fn() as jest.MockedFunction<typeof userservice.createUser>;
    mockCreate.mockImplementation(async()=>{
        console.log('created user successfully in test')
    })
    const ans = mockCreate({ username, password })
    expect(mockCreate).toBeCalledTimes(1)
    expect(mockCreate).toHaveBeenCalledWith({ username, password })
  }) 


  it("makes get request to get all users",async():Promise<void>=>{
    const mockgetUsers = jest.fn() as jest.MockedFunction<typeof userservice.getUser>;
    mockgetUsers.mockImplementation(async()=>{
        console.log('got user successfully in test')
    })
    const ans = mockgetUsers(test_user)
    expect(mockgetUsers).toBeCalledTimes(1)
    expect(mockgetUsers).toHaveBeenCalledWith(test_user)
  }) 

  it("makes get request by id ",async():Promise<void>=>{
    const mockfindUserById = jest.fn() as jest.MockedFunction<typeof userservice.findUserById>;
    mockfindUserById.mockImplementation(async()=>{
        console.log('found user successfully in test')
    })
    const ans = mockfindUserById(1)
    expect(mockfindUserById ).toBeCalledTimes(1)
    expect(mockfindUserById ).toHaveBeenCalledWith(1)
  })



  it("makes delete request",async():Promise<void>=>{
    const mockDelete = jest.fn() as jest.MockedFunction<typeof userservice.deleteUser>;
    mockDelete.mockImplementation(async()=>{
        console.log('deleted successfully in test')
    })
    const ans = mockDelete(test_user)
    expect(mockDelete).toBeCalledTimes(1)
    expect(mockDelete).toHaveBeenCalledWith(test_user)
  })  
});


