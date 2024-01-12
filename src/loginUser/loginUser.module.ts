import { Module } from "@nestjs/common"
import { LoginUserController } from "./loginUser.controller"
import { LoginUserService } from "./loginUser.service"
import { PrismaService } from "src/prisma/prisma.service"
import { LoginUserRepository } from "./repository/login.repository"
import { AuthModule } from "src/auth/auth.module"

@Module({
    imports: [AuthModule],
    controllers: [LoginUserController],
    providers: [LoginUserService, PrismaService, LoginUserRepository]
})
export class LoginUserModule{}