import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Headers, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Response } from 'express';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Res() res: Response, @Headers('authorization') authorization: string) {
    const createTask = await this.tasksService.create(createTaskDto, authorization);
    return res.status(201).json(createTask);
  }

  @Get()
  async findAll(@Res() res: Response) {
    const findAllTasks = await this.tasksService.findAll();
    return res.status(200).json(findAllTasks);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const findOneTask = await this.tasksService.findOne(id);
    return res.status(200).json(findOneTask);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @Res() res: Response) {
    const taskUpdate = await this.tasksService.update(id, updateTaskDto);
    return res.status(200).json(taskUpdate);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.tasksService.remove(id);
    return res.status(204).json();
  }
}
