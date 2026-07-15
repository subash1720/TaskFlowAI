import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';

  private authService = inject(AuthService);
  private router = inject(Router);

  register() {
    if (!this.name.trim() || !this.email.trim() || !this.password || !this.confirmPassword) {
      alert('Please fill out all fields.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    const regData = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.authService.register(regData).subscribe({
      next: (response: any) => {
        console.log(response);
        alert('Registration Successful! Please log in with your credentials.');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error(error);
        alert(error.error?.message || 'Registration failed. Please try again.');
      }
    });
  }
}
