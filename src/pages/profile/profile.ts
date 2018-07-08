import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Profile } from '../../models/profile/profile';
import { AuthService } from '../../providers/auth/auth.service';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  existingProfile: Profile;

  constructor(
    private app: App,
    private auth: AuthService,
    private navCtrl: NavController,
    private navParams: NavParams
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  getExistingProfile(profile: Profile) {
    this.existingProfile = profile;
  }

  navigateToEditProfile() {
    this.navCtrl.push('EditProfilePage', {
      existingProfile: this.existingProfile
    });
  }

  logout() {
    this.auth.signOut();
    this.app.getRootNav().setRoot('LoginPage');
    // this.navCtrl.setRoot('LoginPage');
  }
}
