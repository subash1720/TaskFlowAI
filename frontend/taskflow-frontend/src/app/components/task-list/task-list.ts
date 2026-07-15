import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TaskService } from '../../services/task.service';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList implements OnInit {
  private taskService = inject(TaskService);
  private router = inject(Router);

  tasks: any[] = [];
  filteredTasks: any[] = [];

  // Filter & Search bindings
  searchQuery = '';
  statusFilter = 'All';
  priorityFilter = 'All';
  sortBy = 'createdAt';

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (response: any) => {
        this.tasks = response.tasks;
        this.applyFiltersAndSort();
      },
      error: (error) => {
        console.error('Error fetching tasks', error);
      }
    });
  }

  applyFiltersAndSort() {
    let result = [...this.tasks];

    // 1. Text Search
    if (this.searchQuery && this.searchQuery.trim() !== '') {
      const query = this.searchQuery.toLowerCase();
      result = result.filter(
        t => t.title.toLowerCase().includes(query) || 
             (t.description && t.description.toLowerCase().includes(query))
      );
    }

    // 2. Status Filter
    if (this.statusFilter !== 'All') {
      result = result.filter(t => t.status === this.statusFilter);
    }

    // 3. Priority Filter
    if (this.priorityFilter !== 'All') {
      result = result.filter(t => t.priority === this.priorityFilter);
    }

    // 4. Sorting
    result.sort((a, b) => {
      if (this.sortBy === 'dueDate') {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      } else if (this.sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else if (this.sortBy === 'priority') {
        const priorityWeight: { [key: string]: number } = { 'High': 3, 'Medium': 2, 'Low': 1 };
        return (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0);
      } else {
        // default: createdAt (newest first)
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    this.filteredTasks = result;
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

  clearFilters() {
    this.searchQuery = '';
    this.statusFilter = 'All';
    this.priorityFilter = 'All';
    this.sortBy = 'createdAt';
    this.applyFiltersAndSort();
  }

  isOverdue(task: any): boolean {
    if (task.status === 'Completed' || !task.dueDate) {
      return false;
    }
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    dueDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    return dueDate < today;
  }
}
