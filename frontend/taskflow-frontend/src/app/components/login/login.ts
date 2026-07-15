import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
  FormsModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule
],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  email = '';
  password = '';

  private authService = inject(AuthService);
  private router = inject(Router);

  login() {

    const loginData = {
      email: this.email,
      password: this.password
    };

    this.authService.login(loginData).subscribe({

      next: (response: any) => {

        console.log(response);

        // Save JWT Token
        localStorage.setItem("token", response.token);
        localStorage.setItem("userName", response.user.name);

        alert("Login Successful!");

        // Navigate to Dashboard
        this.router.navigate(['/dashboard']);

      },

      error: (error) => {

        console.error(error);

        alert(error.error.message);

      }

    });

  }

}