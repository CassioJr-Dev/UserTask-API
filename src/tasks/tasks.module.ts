import { Module } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { TasksController } from './tasks.controller'
import { PrismaService } from 'src/prisma/prisma.service'
import { TasksRepository } from './repository/tasks.repository'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  imports: [AuthModule],
  controllers: [TasksController],
  providers: [TasksService, PrismaService, TasksRepository],
})
export class TasksModule {}
