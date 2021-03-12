import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AuthHelper } from './config/auth.helper';
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../user/user.service';
import { AuthLoginInput } from '../../entities/auth/auth-login.input';
import { AuthRegisterInput } from '../../entities/auth/auth-register.input';
import { JwtDto } from '../../entities/auth/jwt.dto';
import { UserToken } from '../../entities/user/user-token';



@Injectable()
export class AuthService {
    constructor(private readonly data: UserService, private readonly jwt: JwtService) {}

    public async login(input: AuthLoginInput): Promise<UserToken> {

        const found = await this.data.user.findUnique({
            where: { username:input.username },
          })

        if (!found) {
        throw new NotFoundException(`User with username ${input.username} does not exist`)
        }

        const passwordValid = await AuthHelper.validate(input.password, found.password)

        if (!passwordValid) {
        throw new Error(`Invalid password`)
        }

        return { id: found.id, user: found, token: this.signToken(found.id),}
    }

    public async register(input: AuthRegisterInput): Promise<UserToken> {

        const found = await this.data.user.findUnique({
            where: { username:input.username },
          })

        if (found) {
        throw new BadRequestException(`Cannot register with username ${input.username}`)
        }

        const password = await AuthHelper.hash(input.password)
        const created = await this.data.user.create({
        data: {
            ...input,
            password,
        },
        })

        return { id: created.id, user: created, token: this.signToken(created.id) }
    }

    private signToken(id: number) {
        const payload: JwtDto = { userId: id }

        return this.jwt.sign(payload)
    }

    public async validateUser(userId: number) {
        return this.data.findUserById(userId)
      }


}

