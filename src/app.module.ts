import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { LoginUserModule } from './loginUser/loginUser.module';

@Module({
  imports: [ConfigModule.forRoot(), TasksModule, UsersModule, LoginUserModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
