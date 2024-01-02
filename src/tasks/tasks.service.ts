import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksRepository } from './repository/tasks.repository';

@Injectable()
export class TasksService {

  constructor(private readonly repository: TasksRepository){}

  create(createTaskDto: CreateTaskDto) {
    return this.repository.create(createTaskDto);
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: string) {
    return this.repository.findOne(id);
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    return this.repository.update(id, updateTaskDto);
  }

  remove(id: string) {
    return this.repository.remove(id);
  }
}
