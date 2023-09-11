import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Barcode } from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-mostrar',
  templateUrl: 'mostrar.page.html',
  styleUrls: ['mostrar.page.scss'],
})
export class MostrarPage implements OnInit {

    datosGuardados: Barcode[] = []; 
    loggedInUser: any;
    rutUser: any;
  
    constructor() {}
  
    ngOnInit() {

      const loggedInUserStr = localStorage.getItem('loggedInUser');
      
      const datosEscaneadosJSON = localStorage.getItem('datosEscaneados');

      if (loggedInUserStr) {
        this.loggedInUser = JSON.parse(loggedInUserStr);
      }
  
      if (datosEscaneadosJSON) {
        this.datosGuardados = JSON.parse(datosEscaneadosJSON);
      }
    }
  }