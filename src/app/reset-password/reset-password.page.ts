import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {
  username: string = '';
  newPassword: string = ''; 

  constructor(
    private alertController: AlertController,
    private router: Router
  ) {}


  async changePassword() {
    
    const storedUserStr = localStorage.getItem('users');

    if (storedUserStr) {
      let storedUser = JSON.parse(storedUserStr);
      const userToChange = storedUser.find((user: any) => user.username === this.username);

      if (userToChange) {
        userToChange.password = this.newPassword;

        localStorage.setItem('users', JSON.stringify(storedUser));

        const alert = await this.alertController.create({
          header: 'Contraseña Cambiada',
          message: `La contraseña para el usuario ${this.username} ha sido cambiada.`,
          buttons: ['OK'],
        });

        await alert.present();

        this.router.navigate(['/login']);


      } else {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'El nombre de usuario no coincide con nuestros registros. Verifique e intente nuevamente.',
          buttons: ['OK'],
        });

        await alert.present();
      }
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No se encontró ningún usuario registrado. Regístrese primero.',
        buttons: ['OK'],
      });

      await alert.present();
    }
  }
}