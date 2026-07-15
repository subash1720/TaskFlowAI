import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../constants/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  login(data: any) {
    return this.http.post(`${API_URL}/auth/login`, data);
  }

  register(data: any) {
    return this.http.post(`${API_URL}/auth/register`, data);
  }
}