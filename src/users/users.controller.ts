import { 
  Controller, Get, Post, Body, Patch,
  Param, Delete, Headers, Res } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { Response } from 'express'
import { CodeUserDto } from './dto/code-user.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    await this.usersService.create(createUserDto);
    return res.status(200).json({message: `Verification code sent to user's email!`})
  }

  @Post('check-code')
  async confirmCode(@Body() code: CodeUserDto, @Res() res: Response) {
    const createUser = await this.usersService.confirmCode(code);
    return res.status(201).json(createUser)
  }

  @Get()
  async findAll(@Res() res: Response) {
    const findAllUsers = await this.usersService.findAll();
    return res.status(200).json(findAllUsers)
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const findOneUser = await this.usersService.findOne(id);
    return res.status(200).json(findOneUser)
  }

  @Patch()
  async update(
    @Body() updateUserDto: UpdateUserDto, 
    @Headers('authorization') authorization: string, @Res() res: Response) {
    const updateUser = await this.usersService.update(authorization, updateUserDto);
    return res.status(200).json(updateUser)
  }

  @Delete()
  async remove(@Headers('authorization') authorization: string, @Res() res: Response) {
    await this.usersService.remove(authorization);
    return res.status(204).json()
  }
}
