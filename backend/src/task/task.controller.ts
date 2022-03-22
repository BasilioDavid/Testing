import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskInterface } from './task.interface';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('')
  public findAll() {
    return this.taskService.findAll();
  }

  @Post('')
  public create(@Body() task: TaskInterface) {
    this.taskService.create(task);
  }

  @Patch('')
  public complete(@Body() task: TaskInterface) {
    this.taskService.update(task);
  }
}
