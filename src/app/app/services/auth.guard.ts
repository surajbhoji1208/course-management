import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const user = localStorage.getItem('localUserData');
    const admin = localStorage.getItem('localAdminData');

    if (user || admin) {
      return true; // Allow navigation
    } else {
      this.router.navigate(['/login']); // Redirect to login if not authenticated
      return false;
    }
  }
}
