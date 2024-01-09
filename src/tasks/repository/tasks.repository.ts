import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateTaskDto } from "../dto/create-task.dto";
import { TaskEntity } from "../taskEntity/task.entity";
import { UpdateTaskDto } from "../dto/update-task.dto";

@Injectable()
export class TasksRepository {
    constructor(private readonly prisma: PrismaService){}

    async create(createTaskDto:CreateTaskDto, extractUserId: string): Promise<TaskEntity> {
        return this.prisma.task.create({
            data: {
                ...createTaskDto,
                authorId: extractUserId
            }
        }
        )
    }

    async findAll(authorId: string): Promise<TaskEntity[]>{
        return this.prisma.task.findMany({
            where: { authorId }
        })
    }

    async findOne(id: string, authorId: string): Promise<TaskEntity>{
        return this.prisma.task.findUnique({
            where: {
                id,
                authorId
            }
        })
    }

    async update(id: string, updateTaskDto: UpdateTaskDto, authorId: string): Promise<TaskEntity>{
        try {

            return await this.prisma.task.update({
                where: {
                    id,
                    authorId
                },
                data: updateTaskDto
            })

        }catch(error) {
            throw new NotFoundException('Task not found!!!')
        }
    }

    async remove(id: string, authorId: string){
        try{

            return await this.prisma.task.delete({
                where: {
                    id,
                    authorId
                }
            })
    
        }catch(error) {
            throw new NotFoundException('Task not found!!!');
        }
    }

    async findUser(id: string) {
        return this.prisma.user.findUnique({
            where: { id }
        })
    }


}