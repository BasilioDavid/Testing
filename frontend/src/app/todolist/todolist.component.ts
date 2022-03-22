import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css'],
})
export class TodolistComponent implements OnInit {
  public tasks$ = this.taskService.tasks$;

  name: FormControl = new FormControl('', [Validators.required]);
  form = this.formBuilder.group({
    name: this.name,
  });

  constructor(
    private readonly taskService: TaskService,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  createTask() {
    if (this.form.valid) {
      this.taskService.createTask(this.name.value);
      this.form.reset();
    }
  }

  completeTask(id: string) {
    this.taskService.completeTask(id);
  }

  descompleteTask(id: string) {
    this.taskService.descompleteTask(id);
  }
}
