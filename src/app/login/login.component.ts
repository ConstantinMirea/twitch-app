import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isLoginMode = true;

  constructor(private authService: AuthService) {

  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {

    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.authService.login(form.value.email,form.value.password);
    if (this.isLoginMode) {
      //
    } else {
      // this.authService.signup(email,password).subscribe(
      //   resData=>{console.log(resData);
      //     this.isLoading=false;
      //   },
      //   err=>{console.log(err);
      //     this.isLoading=false;});
      // }

      // form.reset();
    }
  }
}
