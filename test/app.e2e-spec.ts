import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { AuthRegisterInput } from '../src/entities/auth/auth-register.input';
import { AuthLoginInput } from '../src/entities/auth/auth-login.input';
import { CreateProfileInput } from '../src/entities/profile/create_profile.input';
import { UpdateProfileInput } from '../src/entities/profile/update_profile.input';
import { v4 as uuidv4 } from "uuid";




describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });


  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
  
  let id: number 
  let token: string
  const Username = `${uuidv4()}@test.username`
  const Password = `${uuidv4()}@test.password`
  const Email = `${uuidv4()}@test.gmail.com`
  const Firstname = `${uuidv4()}@test.firstname`
  const Updatedname= `${uuidv4()}@test.firstname`

  const new_user: AuthRegisterInput = {
    username: Username,
    password: Password
  };

  const login_user: AuthLoginInput = {
    username: Username,
    password: Password
  };

  const create_profile: CreateProfileInput = {
    firstname:Username,
    lastname:"kumar",
    phonenumber:"999",
    Email: Email
  };

  const update_profile: UpdateProfileInput = {
    firstname:Updatedname,
    lastname:"panday",
    phonenumber:"999",
    Email: Email
  };
  
  it('register an user',async()=> {

    const createuserObject = JSON.stringify(new_user).replace(
      /\"([^(\")"]+)\":/g,
      '$1:',
    );
    const register_user = `
    mutation {
      register(input: ${createuserObject}) {
        id
        token
      }
    }`;

    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: register_user,
      })
      .expect(({ body }) => {
        const data = body.data.register;
        id = data.id
        token = data.token
        console.log("token   ",token)
      })
      .expect(200);

  })
  

  it('login',async()=> {

    const loginuserObject = JSON.stringify(login_user).replace(
      /\"([^(\")"]+)\":/g,
      '$1:',
    );
    const loginUser = `
    mutation {
      login(input: ${loginuserObject}) {
        id
        token
      }
    }`;

    const result=  await request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: loginUser,
      })
      .expect(({ body }) => {
        const data = body.data.login;
        id = data.id
        token = data.token
        console.log("token   ",token)
      })
      .expect(200);

    expect(result.body.data).toEqual(
      expect.objectContaining({
          login: {
            id : expect.any(Number),
            token: expect.any(String),
          },
      }),
  );
  })

it("creatprofile", async ()=> {
  const createprofile = JSON.stringify(create_profile).replace(
    /\"([^(\")"]+)\":/g,
    '$1:',
  );
  const createProfilequery = `
  mutation {
    createProfile(input: ${createprofile}) {
      id
      firstname
      lastname
      phonenumber
      Email
    }
  }`;

  return await request(app.getHttpServer())
    .post('/graphql')
    .set('Content-Type', 'application/json')
    .set(
        "Authorization"
            ? {
                  "Authorization": "Bearer " + token,
              }
            : {},
    )
    .send({ 
      operationName: null,
      query: createProfilequery, })
    .expect(({ body }) => {
      const data = body.data.createProfile;
      expect(data.lastname).toBe(create_profile.lastname);
      expect(data.phonenumber).toBe(create_profile.phonenumber);    
      expect(data.Email).toBe(create_profile.Email);  
    })
    .expect(200);
  })

 



it("updateuser", async ()=> {

  const updateprofile = JSON.stringify(update_profile).replace(
    /\"([^(\")"]+)\":/g,
    '$1:',
  );
  const updateProfilequery = `
  mutation {
    updateProfile(input: ${updateprofile}) {
      id
      lastname
      phonenumber
    }
  }`;

  return await request(app.getHttpServer())
    .post('/graphql')
    .set('Content-Type', 'application/json')
    .set(
        "Authorization"
            ? {
                  "Authorization": "Bearer " + token,
              }
            : {},
    )
    .send({ 
      operationName: null,
      query: updateProfilequery, })
    .expect(({ body }) => {
      const data = body.data.updateProfile;
      expect(data.lastname).toBe(update_profile.lastname);
      expect(data.phonenumber).toBe(update_profile.phonenumber);     
    })
    .expect(200);
  })


it("getProfile", async ()=> {

    const getProfilequery = `
    query {
      getProfile{
        firstname
        lastname
      }
    }`;
  
    return await request(app.getHttpServer())
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .set(
          "Authorization"
              ? {
                    "Authorization": "Bearer " + token,
                }
              : {},
      )
      .send({ 
        operationName: null,
        query: getProfilequery, })
      .expect(({ body }) => {
        const data = body.data.getProfile;
        console.log("got user",data) 
      })   
      .expect(200);
    })

it("deleteProfile", async ()=> {

  const deleteProfilequery = `
  mutation {
    deleteProfile
  }`;

  return await request(app.getHttpServer())
    .post('/graphql')
    .set('Content-Type', 'application/json')
    .set(
        "Authorization"
            ? {
                  "Authorization": "Bearer " + token,
              }
            : {},
    )
    .send({ 
      operationName: null,
      query: deleteProfilequery, })
    .expect(200);
  })

  it("get all profiles", async ()=> {

    const getProfilesquery = `
    query {
      Profiles{
        id
        lastname
      }
    }`;
  
    return await request(app.getHttpServer())
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send({ 
        operationName: null,
        query: getProfilesquery, })
      .expect(({ body }) => {
        const data = body.data.Profiles;
        console.log(data) 
      }) 
      .expect(200);
    })


});
