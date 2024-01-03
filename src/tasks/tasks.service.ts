import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksRepository } from './repository/tasks.repository';

@Injectable()
export class TasksService {

  constructor(private readonly repository: TasksRepository){}

  async create(createTaskDto: CreateTaskDto) {
    return this.repository.create(createTaskDto);
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findOne(id: string) {
    const taskId = await this.repository.findOne(id);
    console.log(taskId)

    if (!taskId) {
      throw new NotFoundException('task not found');
    }

    return taskId;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    return this.repository.update(id, updateTaskDto);
  }

  async remove(id: string) {
    return this.repository.remove(id);
  }                                    
}
