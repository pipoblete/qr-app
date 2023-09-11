import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {
  username: string = '';
  newPassword: string = ''; 

  constructor(
    private alertController: AlertController
  ) {}


  async changePassword() {
    
    const storedUserStr = localStorage.getItem('user');

    if (storedUserStr) {
      const storedUser = JSON.parse(storedUserStr);

      if (storedUser.username === this.username) {
        storedUser.password = this.newPassword;

        localStorage.setItem('user', JSON.stringify(storedUser));

        const alert = await this.alertController.create({
          header: 'Contraseña Cambiada',
          message: `La contraseña para el usuario ${this.username} ha sido cambiada.`,
          buttons: ['OK'],
        });

        await alert.present();

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