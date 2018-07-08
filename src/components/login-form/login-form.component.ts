import { Component, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Account } from '../../models/account/account';
import { LoginResponse } from '../../models/login/login-response';
import { AuthService } from '../../providers/auth/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: 'login-form.component.html'
})
export class LoginFormComponent {
  account: Account = {
    email: 'test@test.com',
    password: '12345678'
  } as Account;
  @Output() loginStatus: EventEmitter<LoginResponse>;

  constructor(
    private authService: AuthService,
    private navCtrl: NavController
  ) {
    this.loginStatus = new EventEmitter<any>();
  }

  // async login() {
  //   try {
  //     const resultLoginResponse = {
  //       result: await this.afAuth.auth.signInWithEmailAndPassword(
  //         this.account.email,
  //         this.account.password
  //       )
  //     };
  //     console.log(resultLoginResponse);
  //     this.loginStatus.emit(<LoginResponse>resultLoginResponse);
  //   } catch (error) {
  //     console.error(error);
  //     const e: LoginResponse = { error };

  //     this.loginStatus.emit(e);
  //   }
  // }

  async login() {
    const resultLoginResponse = await this.authService.signInWithEmailAndPassword(
      this.account
    );
    this.loginStatus.emit(resultLoginResponse);
  }

  navigateToRegisterPage() {
    this.navCtrl.push('RegisterPage');
  }
  // navigateToPage(pageName: string, setRoot = false) {
  //   if (!setRoot) {
  //     this.navCtrl.push(pageName);
  //   } else {
  //     this.navCtrl.setRoot(pageName);
  //   }
  // }
}
