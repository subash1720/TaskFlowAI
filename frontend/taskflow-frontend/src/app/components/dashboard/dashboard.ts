import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Router, RouterLink } from '@angular/router';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  private taskService = inject(TaskService);
  private router = inject(Router);

  tasks: any[] = [];
  userName = '';
  
  // Metrics
  pendingCount = 0;
  inProgressCount = 0;
  completedCount = 0;
  highPriorityCount = 0;
  completionPercentage = 0;

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName') || 'User';
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (response: any) => {
        console.log(response);
        this.tasks = response.tasks;
        this.calculateMetrics();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  calculateMetrics() {
    const total = this.tasks.length;
    this.pendingCount = this.tasks.filter(t => t.status === 'Pending').length;
    this.inProgressCount = this.tasks.filter(t => t.status === 'In Progress').length;
    this.completedCount = this.tasks.filter(t => t.status === 'Completed').length;
    this.highPriorityCount = this.tasks.filter(t => t.priority === 'High').length;
    
    this.completionPercentage = total > 0 ? Math.round((this.completedCount / total) * 100) : 0;
  }

  editTask(task: any) {
    this.router.navigate(['/task-form'], {
      state: { task }
    });
  }

  toggleStatus(task: any) {
    const nextStatusMap: { [key: string]: string } = {
      'Pending': 'In Progress',
      'In Progress': 'Completed',
      'Completed': 'Pending'
    };
    
    const newStatus = nextStatusMap[task.status] || 'Pending';
    
    this.taskService.updateTask(task._id, { status: newStatus }).subscribe({
      next: () => {
        this.loadTasks();
      },
      error: (err) => {
        console.error(err);
        alert('Failed to update status.');
      }
    });
  }

  deleteTask(id: string) {
    if (!confirm("Are you sure you want to delete this task?")) {
      return;
    }

    this.taskService.deleteTask(id).subscribe({
      next: () => {
        alert("Task Deleted Successfully!");
        this.loadTasks();
      },
      error: (error) => {
        console.error(error);
        alert(error.error?.message || 'Failed to delete task.');
      }
    });
  }
}