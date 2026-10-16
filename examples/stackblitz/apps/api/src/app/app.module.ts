import { Module } from '@nestjs/common';
import { TasksController } from './tasks/tasks.controller';
import { TasksService } from './tasks/tasks.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
})
export class AppModule {}
