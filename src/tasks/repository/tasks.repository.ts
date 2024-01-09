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

    async findAll(): Promise<TaskEntity[]>{
        return this.prisma.task.findMany()
    }

    async findOne(id: string): Promise<TaskEntity>{
        return this.prisma.task.findUnique({
            where: { id }
        })
    }

    async update(id: string, updateTaskDto: UpdateTaskDto): Promise<TaskEntity>{
        try {

            return await this.prisma.task.update({
                where: { id },
                data: updateTaskDto
            })

        }catch(error) {
            throw new NotFoundException('Task not found!!!')
        }
    }

    async remove(id: string){
        try{

            return await this.prisma.task.delete({
                where: { id }
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