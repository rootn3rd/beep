import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Profile } from '../../models/profile/profile';

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html'
})
export class EditProfilePage {
  profile: Profile = {} as Profile;

  constructor(
    private app: App,
    private navCtrl: NavController,
    private navParams: NavParams
  ) {
    this.profile = this.navParams.get('existingProfile');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  saveProfileResult($event: boolean) {
    $event
      ? this.app.getRootNav().setRoot('TabsPage')
      : console.error('Not authenticated!');
  }
}

// //this.navCtrl.setRoot('TabsPage')
