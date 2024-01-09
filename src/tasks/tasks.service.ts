import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksRepository } from './repository/tasks.repository';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class TasksService {

  constructor(
    private readonly repository: TasksRepository,
    private readonly authService: AuthService
    ){}

  async create(createTaskDto: CreateTaskDto, headerAuthorization: string) {
    const jwtExtractor = this.authService.jwtExtractor(headerAuthorization)

    const extractUserId = this.authService.extrairIdDoUsuario(jwtExtractor)
    
    const userExists = this.repository.findUser(extractUserId)

    if(!userExists) {
      throw new UnauthorizedException('User not authorized!')
    }
    
    return this.repository.create(createTaskDto, extractUserId);
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
