import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FetchDataModule } from './common/modules/fetch-data/fetch-data.module';
import { TodolistComponent } from './todolist/todolist.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, TodolistComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FetchDataModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
