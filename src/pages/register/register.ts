import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from 'ionic-angular';
import { LoginResponse } from '../../models/login/login-response';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  constructor(
    private toast: ToastController,
    private navCtrl: NavController,
    private navParams: NavParams
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  handleRegister($event: LoginResponse) {
    if (!$event.error) {
      this.toast
        .create({
          message: `Account created successfully: ${$event.result.user.email}.`,
          duration: 3000
        })
        .present();
    } else {
      this.toast
        .create({
          message: $event.error.message,
          duration: 3000
        })
        .present();
    }
  }
}
