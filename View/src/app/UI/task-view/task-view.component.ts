import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { List } from 'src/app/models/list.model';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists: List[] = [];
  tasks: Task[] = [];
  taskCount: any;
  selectedListId!: string;

  constructor(private taskService: TaskService, private authService: AuthService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        console.log(params);
        if (params['listId'] != null) {
          this.selectedListId = params['listId'];
          const taskId = params['listId'];
          this.taskService.getTasks(taskId).subscribe(
            (tasks: any) => {
              this.tasks = tasks;
              this.taskCount = this.tasks.length;
              console.log(this.taskCount);
            });
        }
      }
    )

    this.taskService.getLists().subscribe((lists: any) => {
      this.lists = lists;
    });
  }

  onTaskClick(task: Task) {
    this.taskService.complete(task).subscribe(() => {
      console.log('Completed Successfully');
      task.completed = !task.completed;
    });
  }

  isAnyLinkActive(): boolean {
    const currentUrl = this.router.url;
    for (const list of this.lists) {
      const expectedUrl = `/lists/${list._id}`;
      if (currentUrl === expectedUrl) {
        return true;
      }
    }
    return false;
  }

  onDeleteList() {
    this.taskService.deleteList(this.selectedListId).subscribe((res: any) => {
      this.router.navigate(['/lists'])
      console.log(res);
    });
  }

  onDeleteTask(id: string) {
    this.taskService.deleteTask(this.selectedListId, id).subscribe((res: any) => {
      this.tasks = this.tasks.filter(val => val._id !== id)
      console.log(res);
    });
  }

  onLogout() {
    this.authService.logout();
  }

  /*createNewList(){
    this.taskService.createList('Testing').subscribe((res:any)=>{
      console.log(res);
    });
  }*/

}
