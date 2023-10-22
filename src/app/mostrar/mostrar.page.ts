import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular'; 

@Component({
  selector: 'app-mostrar',
  templateUrl: 'mostrar.page.html',
  styleUrls: ['mostrar.page.scss'],
})
export class MostrarPage implements OnInit {
  datosEscaneados: string = '';
  loggedInUser: any;
  rutUser: any;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private storage: Storage
  ) {}

  async ngOnInit() {
    await this.authService.initStorage();
    if (await this.authService.isAuthenticatedUser()) {
      console.log('El usuario está autenticado.');
      const loggedInUserStr = await this.storage.get('loggedInUser');
      if (loggedInUserStr) {
        this.loggedInUser = JSON.parse(loggedInUserStr);
      }
      this.route.paramMap.subscribe(params => {
        const resultado = params.get('resultado');
        if (resultado !== null) {
          this.datosEscaneados = resultado;
        }
      });
    } else {
      console.log('El usuario no está autenticado. Redirigiendo a la página de inicio de sesión.');
      this.router.navigate(['/login']);
    }
  }

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  
}
