import { Injectable } from '@nestjs/common';
import { TaskInterface } from './task.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TaskService {
  private tasks: TaskInterface[] = [
    // {
    //   id: uuidv4(),
    //   name: 'Mi cumple',
    //   competed: true,
    // },
    // {
    //   id: uuidv4(),
    //   name: 'Mi no cumple',
    //   competed: false,
    // },
  ];

  public findAll() {
    return this.tasks;
  }

  public create(value: TaskInterface) {
    if (!this.tasks.find((event) => event.id === value.id))
      this.tasks = [...this.tasks, value];
  }

  public update(task: TaskInterface) {
    this.tasks = [...this.tasks.filter((t) => t.id !== task.id), { ...task }];
  }
}
