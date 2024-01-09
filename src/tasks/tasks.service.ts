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

    const extractUserId = await this.verifyExtractIDFromToken(headerAuthorization)
    
    return this.repository.create(createTaskDto, extractUserId);
  }

  async findAll(headerAuthorization: string) {

    const extractUserId = await this.verifyExtractIDFromToken(headerAuthorization)

    return this.repository.findAll(extractUserId);
  }

  async findOne(id: string, headerAuthorization: string) {
    const extractUserId = await this.verifyExtractIDFromToken(headerAuthorization)

    const task = await this.repository.findOne(id, extractUserId);

    if (!task) {
      throw new NotFoundException('Task not found!');
    }

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, headerAuthorization: string) {

    const extractUserId = await this.verifyExtractIDFromToken(headerAuthorization)
    return this.repository.update(id, updateTaskDto, extractUserId);
  }

  async remove(id: string, headerAuthorization: string) {

    const extractUserId = await this.verifyExtractIDFromToken(headerAuthorization)
    return this.repository.remove(id, extractUserId);
  }
  
  private async verifyExtractIDFromToken(headerAuthorization: string) {
    const jwtExtractor = this.authService.jwtExtractor(headerAuthorization)

    const extractUserId = this.authService.extractUserIdFromToken(jwtExtractor)

    const userExists = await this.repository.findUser(extractUserId)

    if(!userExists) {
      throw new UnauthorizedException('User not authorized!')
    }

    return extractUserId
  }
}
