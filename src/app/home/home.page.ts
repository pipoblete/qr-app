import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { BrowserMultiFormatReader, Result } from '@zxing/library';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('video', { static: true }) video!: ElementRef;
  private codeReader: BrowserMultiFormatReader;
  isScanning = false;
  scannedResult: string | null = null;

  constructor(private router: Router, private authService: AuthService, private storage: Storage) {
    this.codeReader = new BrowserMultiFormatReader();
  }

  ngOnInit() {
    if (!this.authService.isAuthenticatedUser()) {
      this.router.navigate(['/login']);
    } else {
      this.startScanning();
    }
  }

  mostrar(){
    this.router.navigate(['/mostrar']);
  }

  async startScanning() {
    try {
      this.isScanning = true;
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (this.video && this.video.nativeElement) {
        this.video.nativeElement.srcObject = stream;
        this.codeReader.decodeFromInputVideoDevice(undefined, this.video.nativeElement)
          .then(async (result: Result) => {
            console.log('Escaneo exitoso:', result.getText());
            this.scannedResult = result.getText();
            
            // Utiliza Ionic Storage para guardar los datos escaneados
            await this.storage.set('datosEscaneados', this.scannedResult);
            
            this.router.navigate(['/mostrar', { resultado: this.scannedResult }]);
          });
      } else {
        console.error('Elemento de video no encontrado.');
      }
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
      this.isScanning = false;
    }
  }
  
}
