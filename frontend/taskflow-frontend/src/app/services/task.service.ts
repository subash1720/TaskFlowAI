import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../constants/api';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private http = inject(HttpClient);

  getTasks() {
    const token = localStorage.getItem('token');

    return this.http.get(`${API_URL}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  createTask(task: any) {
    const token = localStorage.getItem('token');

    return this.http.post(`${API_URL}/tasks`, task, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

 

   private getHeaders() {

  return {

    Authorization: `Bearer ${localStorage.getItem('token')}`

  };

}

deleteTask(id: string) {
  return this.http.delete(
    `${API_URL}/tasks/${id}`,
    {
      headers: this.getHeaders()
    }
  );
}
updateTask(id: string, task: any) {
  return this.http.put(
    `${API_URL}/tasks/${id}`,
    task,
    {
      headers: this.getHeaders()
    }
  );
}

}



