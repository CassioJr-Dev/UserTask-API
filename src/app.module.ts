import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TasksModule } from './tasks/tasks.module'
import { PrismaService } from './prisma/prisma.service'
import { UsersModule } from './users/users.module'
import { LoginUserModule } from './loginUser/loginUser.module'

@Module({
  imports: [ConfigModule.forRoot(), TasksModule, UsersModule, LoginUserModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
