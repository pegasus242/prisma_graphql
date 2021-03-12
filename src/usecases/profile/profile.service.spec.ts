import { v4 as uuidv4 } from "uuid";
import { PrismaClient } from "@prisma/client";
import {UserService} from "../user/user.service" 
import { ConfigService } from '@nestjs/config'
import { ProfileService } from "./profile.service";
import { User } from '../../entities/user/user.type'
import {CreateProfileInput} from '../../entities/profile/create_profile.input'
import { UpdateProfileInput } from "../../entities/profile/update_profile.input";
import * as dotenv from 'dotenv'
dotenv.config()


async function createuserifnotexists():Promise<any> {
  
  const found = await prisma.user.findUnique({
    where: {
      username:'test_user',
    },
  })
  
  if(found){
    return found
  }

  else if(!found){
    await prisma.user.create({
      data: {
          username: 'test_user',
          password: 'test_user',
      }
  })
  
    const new_user = await prisma.user.findUnique({
    where: {
      username:'test_user',
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
  let profileservice = new ProfileService(data)
  
  
  const new_profile: CreateProfileInput = {
    firstname:`${uuidv4()}@test.firstname`,
    lastname:`${uuidv4()}@test.lastname`,
    phonenumber:`${uuidv4()}@test.phonenumber`,
    Email: `${uuidv4()}@test.email`,
  };
  
  const updated_profile: UpdateProfileInput = {
    firstname:`${uuidv4()}@test.firstname`,
    lastname:`${uuidv4()}@test.lastname`,
    phonenumber:`${uuidv4()}@test.phonenumber`,
    Email: `${uuidv4()}@test.email`,
  };
  
  
  describe("createProfileAction() - unit", () => {
  
    it("creates new profile correctly", async () => {
  
      try{
        created_user = await createuserifnotexists()
  
        test_user = {
          id: created_user.id,
          username: 'test_user',
          password: 'test_user'
        }
      
        await profileservice.createProfile(test_user, new_profile);
    
        const [savedProfile] = await prisma.profile.findMany({
          where: { Email:new_profile.Email },
          take: 1,
        });
    
        expect(savedProfile.Email).toBe(new_profile.Email);
        } catch(err){
        console.log(err.message)
  
      }
    })
  
    it("fails if tries to create records with the same user twice", async () => {
  
      try{
        created_user = await createuserifnotexists()
  
        test_user = {
          id: created_user.id,
          username: 'test_user',
          password: 'test_user'
        }
    
        expect(() => profileservice.createProfile(test_user, new_profile)).rejects.toThrow(
          `Profile already exists!`
        );
      }catch(err){
        console.log(err.message)
  
      }
  
    });
  
  
    it("gets the profile correctly", async () => {
  
      try{
        created_user = await createuserifnotexists()
  
        test_user = {
          id: created_user.id,
          username: 'test_user',
          password: 'test_user'
        }
    
          const received_profile = await profileservice.getProfile(test_user);
          expect(received_profile.Email).toBe(new_profile.Email);
  
      }catch(err){
        console.log(err.message)
  
      }
    })
    
    it("updates new profile correctly", async () => {
  
      try{
        created_user = await createuserifnotexists()
  
        test_user = {
          id: created_user.id,
          username: 'test_user',
          password: 'test_user'
        }
    
          await profileservice.updateProfile(test_user, updated_profile);
      
          const [updatedProfile] = await prisma.profile.findMany({
            where: { Email:updated_profile.Email },
            take: 1,
          });
  
      }catch(err){
        console.log(err.message)
  
      }
  
  
    })
  
  
    it("deletes profile correctly", async () => {
  
      try{
        created_user = await createuserifnotexists()
  
        test_user = {
          id: created_user.id,
          username: 'test_user',
          password: 'test_user'
        }
    
          const deleted = await profileservice.deleteProfile(test_user);
          expect(deleted).toBe(true);
    
      }catch(err){
        console.log(err.message)
  
      }
  
    })
  
  
  });
}



main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

