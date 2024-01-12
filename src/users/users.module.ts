import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersRepository } from './repository/users.repository';
import { AuthModule } from 'src/auth/auth.module';
import { ValidateEmail } from 'src/validateEmail/validateEmail.service';

@Module({
  imports: [AuthModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, UsersRepository, ValidateEmail],
})
export class UsersModule {}
