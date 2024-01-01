import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [ConfigModule.forRoot(), TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
