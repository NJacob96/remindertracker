import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/Task';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskSerice: TaskService) { }

  ngOnInit(): void {
    this.taskSerice.getTasks().subscribe((tasks)=>(this.tasks = tasks));
  }
  
  DeleteTask(task: Task){
    this.taskSerice
    .deleteTask(task)
    .subscribe(
      ()=>(this.tasks = this.tasks.filter(t => t.id !== task.id)));
  }

  toggleReminder(task: Task){
    console.log(task.reminder)
    task.reminder =!task.reminder;
    this.taskSerice.updateTaskReminder(task).subscribe();
  }

  AddTask(task: Task){
    this.taskSerice.addTask(task).subscribe((task) => (this.tasks.push(task)));
  }
}
