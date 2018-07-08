import {
  Component,
  OnDestroy,
  Output,
  EventEmitter,
  Input,
  OnInit
} from '@angular/core';
import { Profile } from '../../models/profile/profile';
import { DataService } from '../../providers/data/data.service';
import { AuthService } from '../../providers/auth/auth.service';
import { User } from 'firebase';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-profile',
  templateUrl: 'edit-profile.component.html'
})
export class EditProfileComponent implements OnInit, OnDestroy {
  @Input() profile: Profile = {} as Profile;

  @Output() saveProfileResult: EventEmitter<boolean>;

  authenticatedUser$: Subscription;
  authenticatedUser: User;

  constructor(
    private authService: AuthService,
    private dataService: DataService
  ) {
    this.saveProfileResult = new EventEmitter<boolean>();

    this.authenticatedUser$ = this.authService
      .getAuthenticatedUser()
      .subscribe((user: User) => {
        this.authenticatedUser = user;
      });
  }

  ngOnInit() {
    if (!this.profile) {
      this.profile = {} as Profile;
    }
  }

  async saveProfile() {
    if (this.authenticatedUser) {
      this.profile.email = this.authenticatedUser.email;
      const result = await this.dataService.saveProfile(
        this.authenticatedUser,
        this.profile
      );
      this.saveProfileResult.emit(result);
      console.log(result);
    } else {
    }
  }

  ngOnDestroy() {
    this.authenticatedUser$.unsubscribe();
  }
}
