import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskViewComponent } from './UI/task-view/task-view.component';
import { NewListComponent } from './UI/new-list/new-list.component';
import { NewTaskComponent } from './UI/new-task/new-task.component';
import { LoginComponent } from './UI/login/login.component';
import { SignUpComponent } from './UI/sign-up/sign-up.component';
import { EditListComponent } from './UI/edit-list/edit-list.component';
import { EditTaskComponent } from './UI/edit-task/edit-task.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'newlist', component: NewListComponent },
  { path: 'lists', component: TaskViewComponent },
  { path: 'lists/:listId', component: TaskViewComponent },
  { path: 'lists/:listId/newtask', component: NewTaskComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'editlist/:listId', component: EditListComponent },
  { path: 'lists/:listId/edittask/:taskId', component: EditTaskComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
