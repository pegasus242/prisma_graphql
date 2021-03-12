import { v4 as uuidv4 } from "uuid";
import { PrismaClient } from "@prisma/client";
import {UserService} from "../user/user.service" 
import { ConfigService } from '@nestjs/config'
import { AddressService } from "./address.service";
import { User } from '../../entities/user/user.type'
import {CreateAddressInput} from '../../entities/address/create_address.input'
import { UpdateAddressInput } from "../../entities/address/update_address.input";
import * as dotenv from 'dotenv'
dotenv.config()

const test_username = `${uuidv4()}@test.username`
const test_password = `${uuidv4()}@test.password`

async function createuserifnotexists():Promise<any> {
  
  const found = await prisma.user.findUnique({
    where: {
      username:test_username,
    },
  })
  
  if(found){
    return found
  }

  else if(!found){
    await prisma.user.create({
      data: {
          username: test_username,
          password: test_password,
      }
  })
  
    const new_user = await prisma.user.findUnique({
    where: {
      username:test_username,
    },
  })
      
    return new_user
    }

}


const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.TEST_DATABASE_URL,
    },
  },
})


async function main(){

  beforeAll(done => {
    done()
  })
   
  afterAll(async (done) => {
    await prisma.$disconnect();
    done();
  });


  let created_user
  let test_user:User
  let config:ConfigService
  let data = new UserService(config)
  let addressservice = new AddressService(data)
  
  
  const new_address: CreateAddressInput = {
    addressLine1: `${uuidv4()}@test.line1address`,
    addressLine2: `${uuidv4()}@test.line2address`,
  };
  
  const updated_address: UpdateAddressInput = {
    addressLine1: `${uuidv4()}@test.line1address`,
    addressLine2: `${uuidv4()}@test.line2address`,    
  };
  
  
  describe("createAddressAction() - unit", () => {
  
    it("creates new address correctly", async () => {
  
      try{
        created_user = await createuserifnotexists()
  
        test_user = {
          id: created_user.id,
          username: test_username,
          password: test_password
        }
      }
      catch(err){
        console.log(err.message)
      }

        await addressservice.createAddress(test_user, new_address);
    
        const [savedAddress] = await prisma.address.findMany({
          where: { addressLine1:new_address.addressLine1 },
          take: 1,
        });
    
        expect(savedAddress.addressLine1).toBe(new_address.addressLine1);
  
      })
    


    it("fails if tries to create records with the same user twice", async () => {
  
      try{
        created_user = await createuserifnotexists()
  
        test_user = {
          id: created_user.id,
          username: test_username,
          password: test_password
        }
      }catch(err){
        console.log(err.message)
      }


        expect(() => addressservice.createAddress(test_user, new_address)).rejects.toThrow(
          `Address already exists!`
        );
      })


      it("gets the address correctly", async () => {
  
        try{
          created_user = await createuserifnotexists()
    
          test_user = {
            id: created_user.id,
            username: test_username,
            password: test_password
          }
        }catch(err){
          console.log(err.message)
        }

            const received_address = await addressservice.getAddress(test_user);
            expect(received_address.addressLine1).toBe(new_address.addressLine1);
    
        })
        

        it("updates new address correctly", async () => {
  
          try{
            created_user = await createuserifnotexists()
      
            test_user = {
              id: created_user.id,
              username:test_username,
              password:test_password
            }
          }catch(err){
            console.log(err.message)
          }

              await addressservice.updateAddress(test_user, updated_address);
          
              const [updatedAddress] = await prisma.address.findMany({
                where: { addressLine1:updated_address.addressLine1 },
                take: 1,
              });
      
          })
      


          it("deletes address correctly", async () => {
  
            try{
              created_user = await createuserifnotexists()
        
              test_user = {
                id: created_user.id,
                username: test_username,
                password: test_password
              }
            }catch(err){
              console.log(err.message)
            }

                const deleted = await addressservice.deleteAddress(test_user);
                expect(deleted).toBe(true);
          
            })
  

  
    })
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })


