import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
})
export class RegisterPage {

  username: string = '';
  password: string = '';
  rut: string = '';

  constructor(private router: Router, private alertController: AlertController) {}

  async register() {
    if (!this.username.trim() || !this.password.trim()) {
      const alert = await this.alertController.create({
        header: 'Error de registro',
        message: 'Por favor, complete todos los campos.',
        buttons: ['OK'],
      });

      await alert.present();
      return; 
    }

    const existingUsersStr = localStorage.getItem('users');
    let existingUsers = existingUsersStr ? JSON.parse(existingUsersStr) : [];

    const usernameExists = existingUsers.some((user: any) => user.username === this.username);

    if (usernameExists) {
      const alert = await this.alertController.create({
        header: 'Error de registro',
        message: 'El nombre de usuario ya está en uso. Elija otro nombre de usuario.',
        buttons: ['OK'],
      });

      await alert.present();
    } else {
      const newUser = {
        username: this.username,
        password: this.password,
        rut: this.rut
      };

      existingUsers.push(newUser);

      localStorage.setItem('users', JSON.stringify(existingUsers));

      const alert = await this.alertController.create({
        header: 'Registro exitoso',
        message: '¡Se ha registrado correctamente!',
        buttons: ['OK'],
      });

      await alert.present();

      this.router.navigate(['/login']);
    }
  }
}
