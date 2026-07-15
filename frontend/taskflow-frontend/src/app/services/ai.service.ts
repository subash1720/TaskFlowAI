import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../constants/api';

@Injectable({
  providedIn: 'root'
})
export class AiService {
  private http = inject(HttpClient);

  private getHeaders() {
    return {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    };
  }

  analyzeTask(title: string, description: string) {
    return this.http.post(
      `${API_URL}/ai/analyze`,
      { title, description },
      {
        headers: this.getHeaders()
      }
    );
  }
}
