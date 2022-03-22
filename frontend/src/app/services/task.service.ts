import { Injectable } from '@angular/core';
import { FetchDataService } from '../common/modules/fetch-data/fetch-data.service';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { TaskInterface } from '../shared/Task.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: TaskInterface[] = [];
  private _tasks$ = new BehaviorSubject<TaskInterface[]>([]);

  public get tasks$() {
    return this._tasks$.asObservable();
  }

  constructor(private readonly fetchDataService: FetchDataService) {
    this.fetchDataService
      .get<TaskInterface[]>(environment.endpoint)
      .subscribe((t) => {
        this.tasks = t;
        this.nextTask();
      });
  }

  private nextTask() {
    this._tasks$.next(this.tasks);
  }

  public completeTask(taskID: string) {
    this.changeTaskCompleteStatus(taskID, true);
  }

  public descompleteTask(taskID: string) {
    this.changeTaskCompleteStatus(taskID, false);
  }

  private changeTaskCompleteStatus(taskID: string, completed: boolean) {
    this.tasks = this.tasks.map((t) =>
      t.id === taskID ? { ...t, completed } : { ...t }
    );
    const task = this.tasks.find((t) => t.id === taskID);
    this.fetchDataService.patch(environment.endpoint, task).subscribe();
    this.nextTask();
  }

  public createTask(name: string) {
    const task = { name, completed: false, id: uuidv4() };
    this.tasks = [...this.tasks, { ...task }];
    this.fetchDataService.post(environment.endpoint, task).subscribe();
    this.nextTask();
  }
}
