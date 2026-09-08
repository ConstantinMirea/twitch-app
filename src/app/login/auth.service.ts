import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: boolean = false;
  private autoLogoutTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(public auth: AngularFireAuth, private router: Router) {
    this.auth.authState.subscribe((user) => {
      this.isAuthenticated = !!user;
      if (this.isAuthenticated) {
        this.setAutoLogout();
      }
    });
  }

  login(email: string, password: string): Promise<void> {
    return this.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.isAuthenticated = true;
        this.setAutoLogout();
        this.router.navigate(['/admin-page']);
      })
      .catch((err) => {
        console.error('Login error:', err);
        this.router.navigate(['/error-page']);
        throw err;
      });
  }

  logout(): void {
    this.auth.signOut();
    this.isAuthenticated = false;
    this.clearAutoLogout();
    this.router.navigate(['/']);
  }

  private setAutoLogout(): void {
    this.clearAutoLogout();
    if (this.isAuthenticated) {
      this.autoLogoutTimer = setTimeout(() => {
        if (this.isAuthenticated) {
          console.log('Auto logout due to inactivity');
          this.logout();
        }
      }, 15 * 60 * 1000);
    }
  }

  private clearAutoLogout(): void {
    if (this.autoLogoutTimer) {
      clearTimeout(this.autoLogoutTimer);
      this.autoLogoutTimer = null;
    }
  }

  isAuth(): boolean {
    return this.isAuthenticated;
  }
}
