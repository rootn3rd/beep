import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../providers/auth/auth.service';
import { DataService } from '../../providers/data/data.service';
import { User } from 'firebase';
import { of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { LoadingController, Loading } from 'ionic-angular';
import { Profile } from '../../models/profile/profile';

@Component({
  selector: 'app-profile-view',
  templateUrl: 'profile-view.component.html'
})
export class ProfileViewComponent implements OnInit {
  private profile: Profile = {} as Profile;

  private loading: Loading;

  @Output() existingProfile: EventEmitter<Profile>;

  constructor(
    private loader: LoadingController,
    private authService: AuthService,
    private dataService: DataService
  ) {
    this.existingProfile = new EventEmitter();

    this.loading = this.loader.create({
      content: 'Loading Profile..'
    });
  }

  ngOnInit() {
    this.loading.present();

    this.dataService.getAuthenticatedUserProfile().subscribe(profile => {
      console.log('Profile: ', profile);
      if (profile) {
        this.profile = profile.payload.val();
        this.existingProfile.emit(this.profile);
        this.loading.dismiss();
      }
    });
    // this.authService.getAuthenticatedUser().subscribe((user: User) => {
    //   this.dataService
    //     .getProfile(user)
    //     .snapshotChanges()
    //     .pipe(
    //       take(1),
    //       catchError(err => {
    //         console.log('[ProfileView] Unable to get profile : ', err);
    //         this.loading.dismiss();

    //         return of(null);
    //       })
    //     )
    //     .subscribe(profile => {
    //       if (profile) {
    //         this.profile = profile.payload.val();
    //         this.existingProfile.emit(this.profile);
    //         this.loading.dismiss();
    //       }
    //     });
    // });
  }
}
