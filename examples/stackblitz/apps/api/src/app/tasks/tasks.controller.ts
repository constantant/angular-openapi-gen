import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTaskDto, Task, TaskStatus, UpdateTaskDto } from './task.dto';
import { TasksService } from './tasks.service';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasks: TasksService) {}

  @Get()
  @ApiOperation({ operationId: 'listTasks', summary: 'List tasks' })
  @ApiQuery({ name: 'status', enum: TaskStatus, enumName: 'TaskStatus', required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @ApiOkResponse({ type: [Task] })
  list(@Query('status') status?: TaskStatus, @Query('limit') limit?: string): Task[] {
    return this.tasks.list(status, limit ? Number(limit) : undefined);
  }

  @Get(':id')
  @ApiOperation({ operationId: 'getTask', summary: 'Get one task' })
  @ApiOkResponse({ type: Task })
  @ApiNotFoundResponse()
  get(@Param('id', ParseIntPipe) id: number): Task {
    return this.tasks.get(id);
  }

  @Post()
  @ApiOperation({ operationId: 'createTask', summary: 'Create a task' })
  @ApiCreatedResponse({ type: Task })
  create(@Body() dto: CreateTaskDto): Task {
    return this.tasks.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ operationId: 'updateTask', summary: 'Update a task' })
  @ApiOkResponse({ type: Task })
  @ApiNotFoundResponse()
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTaskDto): Task {
    return this.tasks.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ operationId: 'deleteTask', summary: 'Delete a task' })
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  remove(@Param('id', ParseIntPipe) id: number): void {
    this.tasks.remove(id);
  }
}
