import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export enum TaskStatus {
  Todo = 'todo',
  InProgress = 'in-progress',
  Done = 'done',
}

export class Task {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'Write the docs' })
  title!: string;

  @ApiPropertyOptional({ example: 'Cover the generator options' })
  description?: string;

  @ApiProperty({ enum: TaskStatus, enumName: 'TaskStatus' })
  status!: TaskStatus;

  @ApiProperty({ format: 'date-time' })
  createdAt!: string;
}

export class CreateTaskDto {
  @ApiProperty({ example: 'Write the docs' })
  title!: string;

  @ApiPropertyOptional()
  description?: string;
}

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiPropertyOptional({ enum: TaskStatus, enumName: 'TaskStatus' })
  status?: TaskStatus;
}
