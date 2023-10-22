import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RegionService } from '../region.service';
import { Storage } from '@ionic/storage'; 

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string = '';
  password: string = '';
  rut: string = '';
  regiones: { id: number; nombre: string }[] = [];
  region: number = 0;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private regionService: RegionService,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.obtenerRegiones();
  }

  async obtenerRegiones() {
    this.regionService.obtenerRegiones().subscribe(
      (data) => {
        this.regiones = data.data;
      },
      (error) => {
        console.error('Error al obtener las regiones: ', error);
      }
    );
  }

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

    let existingUsers: any[] = [];
    try {
      const existingUsersStr = await this.storage.get('users');
      if (existingUsersStr) {
        existingUsers = JSON.parse(existingUsersStr);
      }
    } catch (error) {
      console.error('Error al obtener usuarios del almacenamiento:', error);
    }

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
        rut: this.rut,
        isAuthenticated: true,
      };

      existingUsers.push(newUser);

      try {
        await this.storage.set('users', JSON.stringify(existingUsers));
      } catch (error) {
        console.error('Error al guardar usuarios en el almacenamiento:', error);
      }

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
