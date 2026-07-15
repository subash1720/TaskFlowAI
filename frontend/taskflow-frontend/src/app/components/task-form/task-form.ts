import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';

import { TaskService } from '../../services/task.service';
import { AiService } from '../../services/ai.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule
  ],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css'
})
export class TaskForm implements OnInit {
  private taskService = inject(TaskService);
  private aiService = inject(AiService);
  private router = inject(Router);

  task: any = {
    title: '',
    description: '',
    priority: 'Medium',
    status: 'Pending',
    dueDate: ''
  };

  isEdit = false;
  isAnalyzing = false;
  aiAnalysis: any = null;

  ngOnInit() {
    const state = history.state;
    if (state && state.task) {
      this.isEdit = true;
      // Make a copy of the task to avoid direct state mutation
      this.task = { ...state.task };
      
      // Format date to YYYY-MM-DD for HTML5 date input
      if (this.task.dueDate) {
        this.task.dueDate = new Date(this.task.dueDate).toISOString().split('T')[0];
      }
    }
  }

  analyzeWithAI() {
    if (!this.task.title || this.task.title.trim() === '') {
      alert('Please enter a task title first so the AI can analyze it.');
      return;
    }

    this.isAnalyzing = true;
    this.aiAnalysis = null;

    this.aiService.analyzeTask(this.task.title, this.task.description).subscribe({
      next: (response: any) => {
        this.isAnalyzing = false;
        if (response.success && response.analysis) {
          this.aiAnalysis = response.analysis;
        }
      },
      error: (error) => {
        this.isAnalyzing = false;
        console.error(error);
        alert(error.error?.message || 'Failed to analyze task with AI.');
      }
    });
  }

  applyAISuggestions() {
    if (!this.aiAnalysis) return;

    this.task.description = this.aiAnalysis.suggestedDescription;
    this.task.priority = this.aiAnalysis.priority;
    
    // Add subtasks and category to the description if user wishes
    let extraDetails = `\n\n--- AI Action Items ---\n`;
    if (this.aiAnalysis.category) {
      extraDetails += `Category: ${this.aiAnalysis.category}\n`;
    }
    if (this.aiAnalysis.estimatedHours) {
      extraDetails += `Estimated Effort: ${this.aiAnalysis.estimatedHours} hours\n`;
    }
    if (this.aiAnalysis.subtasks && this.aiAnalysis.subtasks.length > 0) {
      extraDetails += `Suggested Subtasks:\n`;
      this.aiAnalysis.subtasks.forEach((sub: string) => {
        extraDetails += `- [ ] ${sub}\n`;
      });
    }

    this.task.description += extraDetails;
    
    // Clear analysis panel after applying
    this.aiAnalysis = null;
    alert('AI Suggestions and subtasks applied to description!');
  }

  saveTask() {
    if (!this.task.title || this.task.title.trim() === '') {
      alert('Task title is required.');
      return;
    }

    if (this.isEdit) {
      this.taskService.updateTask(this.task._id, this.task).subscribe({
        next: () => {
          alert('Task Updated Successfully!');
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error(error);
          alert(error.error?.message || 'Failed to update task.');
        }
      });
    } else {
      this.taskService.createTask(this.task).subscribe({
        next: () => {
          alert('Task Created Successfully!');
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error(error);
          alert(error.error?.message || 'Failed to create task.');
        }
      });
    }
  }
}