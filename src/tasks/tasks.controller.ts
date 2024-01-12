import { 
  Controller, Get, Post, Body, 
  Patch, Param, Delete, Res, Headers, } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { Response } from 'express'

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto, @Res() res: Response, 
    @Headers('authorization') authorization: string) {
    const createTask = await this.tasksService.create(createTaskDto, authorization)
    return res.status(201).json(createTask)
  }

  @Get()
  async findAll(@Res() res: Response, @Headers('authorization') authorization: string) {
    const findAllTasks = await this.tasksService.findAll(authorization)
    return res.status(200).json(findAllTasks)
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string, @Res() res: Response, 
    @Headers('authorization') authorization: string) {
    const findOneTask = await this.tasksService.findOne(id, authorization)
    return res.status(200).json(findOneTask)
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto,
    @Res() res: Response, @Headers('authorization') authorization: string) {
    const taskUpdate = await this.tasksService.update(id, updateTaskDto, authorization)
    return res.status(200).json(taskUpdate)
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string, @Res() res: Response, 
    @Headers('authorization') authorization: string) {
    await this.tasksService.remove(id, authorization)
    return res.status(204).json()
  }
}
