import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: boolean = false;

  constructor(private router: Router, private storage: Storage) {
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
    const authenticated = await this.storage.get('authenticated');
    this.isAuthenticated = authenticated === true;
  }

  async login() {
    this.isAuthenticated = true;
    await this.storage.set('authenticated', true);
  }

  async logout() {
    this.isAuthenticated = false;
    await this.storage.set('authenticated', false);
    await this.storage.remove('loggedInUser');
    this.router.navigate(['/login']);
  }

  async isAuthenticatedUser(): Promise<boolean> {
    return this.isAuthenticated;
  }
}
