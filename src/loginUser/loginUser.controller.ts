import { Body, Controller, Post, Res } from "@nestjs/common"
import { LoginUserService } from "./loginUser.service"
import { LoginUserDto } from "./dto/login-user.dto"
import { Response } from "express"

@Controller('login')
export class LoginUserController{
    constructor(private readonly loginUserService: LoginUserService){}

    @Post()
    async findOne(@Body() loginUserDto: LoginUserDto, @Res() res: Response){
        const loginUser = await this.loginUserService.login(loginUserDto)
        return res.status(201).json(loginUser)
    }
}