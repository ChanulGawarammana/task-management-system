import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskViewComponent } from './UI/task-view/task-view.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NewListComponent } from './UI/new-list/new-list.component';
import { NewTaskComponent } from './UI/new-task/new-task.component';
import { LoginComponent } from './UI/login/login.component';
import { WebreqInterceptorService } from './webreq.interceptor.service';
import { SignUpComponent } from './UI/sign-up/sign-up.component';
import { EditListComponent } from './UI/edit-list/edit-list.component';
import { EditTaskComponent } from './UI/edit-task/edit-task.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskViewComponent,
    NewListComponent,
    NewTaskComponent,
    LoginComponent,
    SignUpComponent,
    EditListComponent,
    EditTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: WebreqInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
