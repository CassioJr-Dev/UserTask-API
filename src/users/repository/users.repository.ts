import { Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"
import { CreateUserDto } from "../dto/create-user.dto"
import { UserEntity } from "../userEntity/user.entity"
import { UpdateUserDto } from "../dto/update-user.dto"

@Injectable()
export class UsersRepository {
    constructor(private readonly prisma: PrismaService){}

    async create(createUserDto: CreateUserDto): Promise<UserEntity> {
        return this.prisma.user.create({
            data: createUserDto
        })
    }

    async findAll(): Promise<UserEntity[]> {
        return this.prisma.user.findMany()
    }

    async findOne(id: string): Promise<UserEntity> {
        return this.prisma.user.findUnique({
            where: { id }
        })
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
        return this.prisma.user.update({
            where: { id },
            data: updateUserDto
        })
    }

    

    async remove(id: string) {
        return this.prisma.user.delete({
            where: { id },
            
        })
    }

    async emailExists(email: string) {
        return this.prisma.user.findUnique({
            where: { email }
        })
    }
}