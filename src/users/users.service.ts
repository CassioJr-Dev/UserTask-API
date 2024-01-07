import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repository/users.repository';
import { UserEntity } from './userEntity/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository){}

  create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.repository.create(createUserDto);
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
