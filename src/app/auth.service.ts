import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: boolean = false;

  constructor(private router: Router) {}

  // Método para iniciar sesión
  login() {
    this.isAuthenticated = true;
  }

  // Método para cerrar sesión
  logout() {
    this.isAuthenticated = false;
    this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión
  }

  // Verifica si el usuario ha iniciado sesión
  isAuthenticatedUser() {
    return this.isAuthenticated;
  }
}
