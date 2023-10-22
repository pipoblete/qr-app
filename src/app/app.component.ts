import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform, private storage: Storage, private authService: AuthService) {
    this.initializeApp();
  }

  ngOnInit() {
    this.authService.initStorage();
  }


  async initializeApp() {
    await this.platform.ready();

    
    await this.storage.create();

    
}
}
