import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {}

  isAuthenticated(): boolean {
    return !!localStorage.getItem('localUserData') || !!localStorage.getItem('localAdminData');
  }

  logout() {
    localStorage.removeItem('localUserData');
    localStorage.removeItem('localAdminData');
    this.router.navigate(['/login']);
  }
}
