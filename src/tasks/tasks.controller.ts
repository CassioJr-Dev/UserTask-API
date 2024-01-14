import { 
  Controller, Get, Post, Body, 
  Patch, Param, Delete, Res, Headers, } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { Response } from 'express'
import { ApiHeader, ApiOperation,  ApiProperty,  ApiResponse,  ApiTags } from '@nestjs/swagger'
import { UserEntity } from 'src/users/userEntity/user.entity'
import { TaskAnswers } from 'src/answersSwagger/task.answers'

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiResponse({ status: 401, description: 'User not authorized!' })
  @ApiResponse({ status: 201, type: TaskAnswers})
  @ApiOperation({ summary: 'Create user task' })
  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto, @Res() res: Response, 
    @Headers('authorization') authorization: string) {
    const createTask = await this.tasksService.create(createTaskDto, authorization)
    return res.status(201).json(createTask)
  }

  @ApiResponse({ status: 404, description: 'Tasks not found!' })
  @ApiResponse({ status: 401, description: 'User not authorized!' })
  @ApiResponse({ status: 200, type: [TaskAnswers] })
  @ApiOperation({ summary: 'Get all user tasks' })
  @Get()
  async findAll(@Res() res: Response, @Headers('authorization') authorization: string) {
    const findAllTasks = await this.tasksService.findAll(authorization)
    return res.status(200).json(findAllTasks)
  }
  
  @ApiResponse({ status: 404, description: 'Task not found!' })
  @ApiResponse({ status: 401, description: 'User not authorized!' })
  @ApiResponse({ status: 200, type:  TaskAnswers })
  @ApiOperation({ summary: 'Get a specific task from the user' })
  @Get(':id')
  async findOne(
    @Param('id') id: string, @Res() res: Response, 
    @Headers('authorization') authorization: string) {
    const findOneTask = await this.tasksService.findOne(id, authorization)
    return res.status(200).json(findOneTask)
  }
  
  @ApiResponse({ status: 404, description: 'Task not found!' })
  @ApiResponse({ status: 401, description: 'User not authorized!' })
  @ApiResponse({ status: 200, type:  TaskAnswers })
  @ApiOperation({ summary: 'Update an existing user task' })
  @Patch(':id')
  async update(
    @Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto,
    @Res() res: Response, @Headers('authorization') authorization: string) {
    const taskUpdate = await this.tasksService.update(id, updateTaskDto, authorization)
    return res.status(200).json(taskUpdate)
  }

  @ApiResponse({ status: 204, description: 'No Content' })
  @ApiOperation({ summary: 'Delete a user task' })
  @Delete(':id')
  async remove(
    @Param('id') id: string, @Res() res: Response, 
    @Headers('authorization') authorization: string) {
    await this.tasksService.remove(id, authorization)
    return res.status(204).json()
  }
}
