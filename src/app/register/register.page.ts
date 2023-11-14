import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RegionService } from '../region.service';
import { Storage } from '@ionic/storage'; 
import { ComunaService } from '../comuna.service';
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import { FilesystemDirectory, Filesystem, Directory } from '@capacitor/filesystem';

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
  comuna: number = 0;
  comunas: { id: number; nombre: string }[] = [];
  latitude: number = 0; 
  longitude: number = 0;
  fotoTomada: string | undefined;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private regionService: RegionService,
    private storage: Storage,
    private comunaService: ComunaService
  ) {}

  ngOnInit() {
    this.obtenerRegiones();
    this.obtenerComunas();
  }

  async tomarFoto() {
    try {
      const foto = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
      });
  
      if (foto && foto.webPath) {
        await this.storage.set('foto', foto.webPath);
        console.log('Foto almacenada en Ionic Storage:', foto.webPath);
        this.fotoTomada = foto.webPath;
      } else {
        console.error('La foto no contiene un webPath válido.');
      }
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
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

  async obtenerComunas() {
    if (this.region) {
      console.log(this.region);
      this.comunaService.obtenerComunas(this.region).subscribe(
        (data) => {
          this.comunas = data.data;
        },
        (error) => {
          console.error('Error al obtener las comunas: ', error);
        }
      );
    }
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

    
try {
  const coordinates = await Geolocation.getCurrentPosition();
    this.latitude = coordinates.coords.latitude;
    this.longitude = coordinates.coords.longitude;
} catch (error) {
  console.error('Error al obtener la ubicación:', error);
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
        latitude: this.latitude,
        longitude: this.longitude,
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
