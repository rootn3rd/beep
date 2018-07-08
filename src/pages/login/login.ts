import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginResponse } from '../../models/login/login-response';
import { ToastController } from 'ionic-angular';
import { DataService } from '../../providers/data/data.service';
import { User } from 'firebase';
import { of } from 'rxjs';
import { take, catchError } from 'rxjs/operators';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  constructor(
    private dataService: DataService,
    private toast: ToastController,
    private navCtrl: NavController,
    private navParams: NavParams
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login($event: LoginResponse) {
    console.log($event);
    if (!$event.error) {
      this.toast
        .create({
          message: `Welcome to Beep! ${$event.result.user.email}`,
          duration: 2000
        })
        .present();

      try {
        this.dataService
          .getProfile(<User>$event.result.user)
          .snapshotChanges()
          .pipe(
            take(1),
            catchError(err => {
              console.log('[LoginPage] Unable to get profile : ', err);
              return of(null);
            })
          )
          .subscribe(profile => {
            if (profile) {
              console.log(profile.payload.val());

              profile.payload.val()
                ? this.navCtrl.setRoot('TabsPage') // this.navCtrl.setRoot('TabsPage')
                : this.navCtrl.setRoot('EditProfilePage');
            }
          });
      } catch (error) {
        console.log('[LoginPage] Unable to get profile : ', error);
      }
      // this.navCtrl.setRoot('EditProfilePage');
    } else {
      this.toast
        .create({
          message: `${$event.error.message}`,
          duration: 3000
        })
        .present();
    }
  }

  navigateToPage(pageName: string, setRoot = false) {
    if (!setRoot) {
      this.navCtrl.push(pageName);
    } else {
      this.navCtrl.setRoot(pageName);
    }
  }
}
