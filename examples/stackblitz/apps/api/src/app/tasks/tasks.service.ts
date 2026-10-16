import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto, Task, TaskStatus, UpdateTaskDto } from './task.dto';

@Injectable()
export class TasksService {
  private nextId = 4;
  private readonly tasks = new Map<number, Task>(
    [
      ['Read the README', TaskStatus.Done],
      ['Run npm run generate', TaskStatus.InProgress],
      ['Add an endpoint to the API and regenerate', TaskStatus.Todo],
    ].map(([title, status], i) => [
      i + 1,
      { id: i + 1, title, status: status as TaskStatus, createdAt: new Date().toISOString() },
    ]),
  );

  list(status?: TaskStatus, limit?: number): Task[] {
    const all = [...this.tasks.values()].filter((t) => !status || t.status === status);
    return limit ? all.slice(0, limit) : all;
  }

  get(id: number): Task {
    const task = this.tasks.get(id);
    if (!task) throw new NotFoundException(`Task ${id} not found`);
    return task;
  }

  create(dto: CreateTaskDto): Task {
    const task: Task = {
      id: this.nextId++,
      title: dto.title,
      description: dto.description,
      status: TaskStatus.Todo,
      createdAt: new Date().toISOString(),
    };
    this.tasks.set(task.id, task);
    return task;
  }

  update(id: number, dto: UpdateTaskDto): Task {
    const task = Object.assign(this.get(id), dto);
    return task;
  }

  remove(id: number): void {
    this.get(id);
    this.tasks.delete(id);
  }
}
