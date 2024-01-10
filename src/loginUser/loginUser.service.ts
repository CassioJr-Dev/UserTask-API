import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { LoginUserRepository } from "./repository/login.repository";
import { LoginUserDto } from "./dto/login-user.dto";
import { compare } from "bcryptjs";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class LoginUserService {
    constructor(
        private readonly repository: LoginUserRepository,
        private readonly authService: AuthService){}

    async login({ email, password }: LoginUserDto) {
        const existsUser = await this.repository.findUser(email)
        
        if(!existsUser) {
            throw new NotFoundException('User not found!')
        }

        const checkPassword = await compare(password, existsUser.password)

        if(!checkPassword) {
            throw new UnauthorizedException('Incorrect password!') 
        }

        const jwtToken = await this.authService.createAccessToken(existsUser.id)
   
        const userReturn = {
            id: existsUser.id,
            name: existsUser.name,
            email: existsUser.email,
            jwtToken
        }
        
        return userReturn
    }
}