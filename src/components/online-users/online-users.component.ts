import { Component, OnInit } from '@angular/core';
import { DataService } from '../../providers/data/data.service';
import { AuthService } from '../../providers/auth/auth.service';
import { User } from 'firebase';
import { take, map } from 'rxjs/operators';
import { Profile } from '../../models/profile/profile';
import { Observable } from 'rxjs';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'app-online-users',
  templateUrl: 'online-users.component.html'
})
export class OnlineUsersComponent implements OnInit {
  onlineUsers: Observable<any[]>;
  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.setUserOnline();
    this.getOnlineUsers();
  }

  getOnlineUsers() {
    this.onlineUsers = this.dataService
      .getOnlineUsers()
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => {
            return {
              $key: c.payload.key,
              ...c.payload.val()
            };
          });
        })
      );
  }

  setUserOnline() {
    // this.dataService.getAuthenticatedUserProfile().subscribe(profile => {
    //   console.log();
    //   this.dataService.setUserOnline(profile);
    // });
    this.authService.getAuthenticatedUser().subscribe((user: User) => {
      this.dataService
        .getProfile(user)
        .snapshotChanges()
        .pipe(take(1))
        .subscribe(profile => {
          console.log('Profile payload Values:', profile.payload.val());
          console.log('Profile key Values:', profile.payload.key);
          this.dataService.setUserOnline(
            profile.payload.val(),
            profile.payload.key
          );
        });
    });
  }

  openChat(user) {
    console.log('Opening chat for :', user);
    this.navCtrl.push('MessagePage', { profile: user });
  }
}
