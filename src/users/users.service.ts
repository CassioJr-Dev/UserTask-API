import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repository/users.repository';
import { UserEntity } from './userEntity/user.entity';
import { hash } from 'bcryptjs'

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository){}

  async create({ name, email, password }: CreateUserDto): Promise<UserEntity> {
    const hashedPassword = await hash(password, 10)
    return this.repository.create({
      name,
      email,
      password: hashedPassword
    });
  }

  findAll(): Promise<UserEntity[]> {
    return this.repository.findAll();
  }

  findOne(id: string): Promise<UserEntity> {
    return this.repository.findOne(id);
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return this.repository.update(id, updateUserDto);
  }

  remove(id: string): Promise<UserEntity> {
    return this.repository.remove(id);
  }
}
