import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mostrar',
  templateUrl: 'mostrar.page.html',
  styleUrls: ['mostrar.page.scss'],
})
export class MostrarPage implements OnInit {

    datosEscaneados: string = ''; 
    loggedInUser: any;
    rutUser: any;
  
    constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) {}
  
    ngOnInit() {

      if (!this.authService.isAuthenticatedUser()) {
       
        this.router.navigate(['/login']);
        return;
      }

      const loggedInUserStr = localStorage.getItem('loggedInUser');

      if (loggedInUserStr) {
        this.loggedInUser = JSON.parse(loggedInUserStr);
      }
  
      this.route.paramMap.subscribe(params => {
        const resultado = params.get('resultado');
        if (resultado !== null) {
          this.datosEscaneados = resultado;
        }
      });
    }
  };