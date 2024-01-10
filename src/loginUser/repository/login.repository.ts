import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UserEntity } from "src/users/userEntity/user.entity";

@Injectable()
export class LoginUserRepository{
    constructor(private readonly prisma: PrismaService){}

    async findUser(email: string): Promise<UserEntity> {
        return this.prisma.user.findUnique({
            where: { email }
        })
    }
}