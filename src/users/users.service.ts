import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repository/users.repository';
import { UserEntity } from './userEntity/user.entity';
import { hash } from 'bcryptjs'
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly repository: UsersRepository,
    private readonly authService: AuthService
    ){}

  async create({ name, email, password }: CreateUserDto): Promise<UserEntity> {
    const emailExists = await this.repository.emailExists(email)

    if(emailExists) {
      throw new ConflictException('Previous existence of the user with the same email!')
    }

    const hashedPassword = await hash(password, 10)

    const createUser = await this.repository.create({
      name,
      email,
      password: hashedPassword
    });

    const jwtToken = await this.authService.createAccessToken(createUser.id)
   
    const userReturn = {
      ...createUser,
      jwtToken
    }
    return userReturn
  }

  async findAll(): Promise<UserEntity[]> {
    return this.repository.findAll();
  }

  async findOne(id: string): Promise<UserEntity> {
    const userExists = await this.repository.findOne(id);
    if(!userExists) {
      throw new NotFoundException('User not found!')
    }
    return userExists
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const userExists = await this.repository.findOne(id)

    if(!userExists) {
      throw new NotFoundException('User not found!')
    }

    return this.repository.update(id, updateUserDto);
  }

  async remove(id: string): Promise<UserEntity> {
    const userExists = await this.repository.findOne(id)

    if(!userExists) {
      throw new NotFoundException('User not found!')
    }

    return this.repository.remove(id);
  }
}
