import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {

  username: string = '';
  password: string = '';

  constructor(private router: Router, private alertController: AlertController) {}

  registro() {
    this.router.navigate(['/register']);
  }

  async login() {

    const storedUsersStr = localStorage.getItem('users');

    if (storedUsersStr) {
      const storedUsers = JSON.parse(storedUsersStr);

      const user = storedUsers.find((u: any) => u.username === this.username && u.password === this.password);

      if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        this.router.navigate(['/home']);
        const alert = await this.alertController.create({
          header: 'Inicio de sesión exitoso',
          message: '¡Bienvenido de nuevo!',
          buttons: ['OK'],
        });
        await alert.present();
      } else {
        const alert = await this.alertController.create({
          header: 'Error de autenticación',
          message: 'Credenciales incorrectas. Verifique su nombre de usuario y contraseña.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    } else {
      const alert = await this.alertController.create({
        header: 'Error de autenticación',
        message: 'No se encontró ningún usuario registrado. Regístrese primero.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
