import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateTaskDto } from "../dto/create-task.dto";
import { TaskEntity } from "../entities/task.entity";
import { UpdateTaskDto } from "../dto/update-task.dto";

@Injectable()
export class TasksRepository {
    constructor(private readonly prisma: PrismaService){}

    async create(createTaskDto:CreateTaskDto): Promise<TaskEntity> {
        return this.prisma.task.create({
            data: createTaskDto
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
        return this.prisma.task.update({
            where: { id },
            data: updateTaskDto
        })
    }

    async remove(id: string){
        return this.prisma.task.delete({
            where: { id }
        })
    }


}