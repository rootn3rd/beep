import { Component, EventEmitter, Output } from '@angular/core';
import { DataService } from '../../providers/data/data.service';
import { Profile } from '../../models/profile/profile';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-profile-search',
  templateUrl: 'profile-search.component.html'
})
export class ProfileSearchComponent {
  query: string;
  profileList: Profile[] = [];

  @Output() selectedProfile: EventEmitter<Profile>;

  constructor(private dataService: DataService) {
    this.selectedProfile = new EventEmitter();
  }

  selectProfile(profile: Profile) {
    console.log('Selected Profile:', profile);
    this.selectedProfile.emit(profile);
  }

  searchUser(query: string) {
    this.dataService
      .searchUser(query)
      .pipe(take(1))
      .subscribe(profiles => {
        this.profileList = profiles as Profile[];
        console.log('Profiles Found: ', profiles);
      });
  }
}
