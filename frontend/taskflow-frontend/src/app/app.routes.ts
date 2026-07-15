import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login').then(m => m.LoginComponent),
    canActivate: [guestGuard]
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./components/register/register').then(m => m.Register),
    canActivate: [guestGuard]
  },

  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/dashboard/dashboard').then(m => m.Dashboard),
    canActivate: [authGuard]
  },

  {
    path: 'tasks',
    loadComponent: () =>
      import('./components/task-list/task-list').then(m => m.TaskList),
    canActivate: [authGuard]
  },

  {
    path: 'task-form',
    loadComponent: () =>
      import('./components/task-form/task-form').then(m => m.TaskForm),
    canActivate: [authGuard]
  },

  {
    path: '**',
    redirectTo: 'login'
  }
];