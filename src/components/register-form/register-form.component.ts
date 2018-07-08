import { Component, Output, EventEmitter } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Account } from '../../models/account/account';
import { ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth.service';
import { LoginResponse } from '../../models/login/login-response';

@Component({
  selector: 'app-register-form',
  templateUrl: 'register-form.component.html'
})
export class RegisterFormComponent {
  account: Account = {} as Account;

  @Output() registerStatus: EventEmitter<LoginResponse>;

  constructor(private authService: AuthService) {
    this.registerStatus = new EventEmitter<LoginResponse>();
  }

  async register() {
    try {
      const result = await this.authService.createUserWithEmailAndPassword(
        this.account
      );

      // this.toast
      //   .create({
      //     message: 'Account created successfully.',
      //     duration: 3000
      //   })
      //   .present();
      this.registerStatus.emit(result);

      console.log(result);
    } catch (error) {
      console.log(error);
      // this.toast
      //   .create({
      //     message: error.message,
      //     duration: 3000
      //   })
      //   .present();
      this.registerStatus.emit(error);
    }
  }
}
