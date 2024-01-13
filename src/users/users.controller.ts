import { 
  Controller, Get, Post, Body, Patch,
  Param, Delete, Headers, Res } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { Response } from 'express'
import { CodeUserDto } from './dto/code-user.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UserAnswers } from 'src/answersSwagger/user.answers'
import { CreateUserAnswers, Message } from 'src/answersSwagger/create.user.answners'

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @ApiResponse({ status: 401, description: 'Previous existence of the user with the same email!' })
  @ApiResponse({ status: 200, type: Message })
  @ApiOperation({ summary: 'Receives user account creation data' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    await this.usersService.create(createUserDto);
    return res.status(200).json({message: `Verification code sent to user's email!`})
  }
  
  @ApiResponse({ status: 404, description: 'Incorrect verification code!' })
  @ApiResponse({ status: 201, type: CreateUserAnswers })
  @ApiOperation({ summary: 'Receive verification code and create user account' })
  @Post('check-code')
  async confirmCode(@Body() code: CodeUserDto, @Res() res: Response) {
    const createUser = await this.usersService.confirmCode(code);
    return res.status(201).json(createUser)
  }

  @ApiResponse({ status: 404, description: 'Users not found!' })
  @ApiResponse({ status: 200, type: [UserAnswers] })
  @ApiOperation({ summary: 'Search all users of the system' })
  @Get()
  async findAll(@Res() res: Response) {
    const findAllUsers = await this.usersService.findAll();
    return res.status(200).json(findAllUsers)
  }


  @ApiResponse({ status: 404, description: 'User not found!' })
  @ApiResponse({ status: 200, type: UserAnswers })
  @ApiOperation({ summary: 'Search for a system user' })
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const findOneUser = await this.usersService.findOne(id);
    return res.status(200).json(findOneUser)
  }

  @ApiResponse({ status: 404, description: 'User not found!' })
  @ApiResponse({ status: 401, description: 'User not authorized!' })
  @ApiResponse({ status: 200, type: UserAnswers })
  @ApiOperation({ summary: 'Update user account data' })
  @Patch()
  async update(
    @Body() updateUserDto: UpdateUserDto, 
    @Headers('authorization') authorization: string, @Res() res: Response) {
    const updateUser = await this.usersService.update(authorization, updateUserDto);
    return res.status(200).json(updateUser)
  }

  @ApiResponse({status: 204, description: 'No Content'})
  @ApiOperation({ summary: 'Delete the user account' })
  @Delete()
  async remove(@Headers('authorization') authorization: string, @Res() res: Response) {
    await this.usersService.remove(authorization);
    return res.status(204).json()
  }
}
