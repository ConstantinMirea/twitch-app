import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: boolean = false;
  constructor(public authService: AngularFireAuth, private router: Router) {

  }

  login(email: string, password: string) {
    this.authService
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        // console.log(result);
        this.isAuthenticated = true;
        this.autologout();
        this.router.navigate(['/admin-page']);
      })
      .catch((err) => {
        console.log(err);
        this.router.navigate(['/error-page']);
      });
  }

  logout() {
    this.authService.signOut();
    this.isAuthenticated = false;
    this.router.navigate(['/']);
  }

  autologout() {
    if (this.isAuthenticated) {
      setTimeout(() => {this.logout},15*60*1000)
    }
  }
  isAuth() {
    return this.isAuthenticated;
  }
}
