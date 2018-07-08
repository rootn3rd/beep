import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList
} from 'angularfire2/database';
import { User, auth, database } from 'firebase';
import { of } from 'rxjs';
import { map, take, tap, mergeMap, catchError } from 'rxjs/operators';
import { Profile } from '../../models/profile/profile';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataService {
  profileObject: AngularFireObject<Profile>;
  profileList: AngularFireList<Profile>;

  constructor(
    private authService: AuthService,
    private database: AngularFireDatabase
  ) {}

  getProfile(user: User) {
    console.log(user);
    try {
      this.profileObject = this.database.object(`/profiles/${user.uid}`);
    } catch (error) {
      console.log('DataService : getProfile - ', error);
    }
    return this.profileObject;
    // return of(this.profileObject).pipe(take(1));
  }

  async saveProfile(user: User, profile: Profile) {
    this.profileObject = this.database.object(`/profiles/${user.uid}`);
    try {
      await this.profileObject.set(profile);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  searchUser(firstName: string) {
    console.log('Searching for : ', firstName);
    this.profileList = this.database.list('/profiles', query => {
      let q = query
        .orderByChild('firstName')
        .equalTo(firstName)
        .limitToFirst(1);
      return q;
    });

    return this.profileList.snapshotChanges().pipe(
      // tap(x => console.log('Before:', x)),
      map(changes => {
        return changes.map(c => {
          return {
            $key: c.payload.key,
            ...c.payload.val()
          };
        });
      })
      // tap(x => console.log('After', x))
    );
    // return this.database.list('/profiles/', query => {
    //   return query
    //     .orderByChild('firstName')
    //     .equalTo(firstName)
    //     .valueChanges()
    //     .take(1);
    // });

    // return this.database
    //   .list('profiles', ref => ref.orderByChild('firstName').equalTo('Pankaj'))
    //   .valueChanges()
    //   .take(1);

    // var itemsRef = this.database.list('profiles');
    // var items = itemsRef.snapshotChanges().pipe(
    //   map(changes =>
    //     changes.map(c => ({
    //       key: c.payload.key,
    //       ...c.payload.val()
    //     }))
    //   )
    // );
    // return items;

    // return this.database.list('/profiles/').snapshotChanges();
  }

  getAuthenticatedUserProfile() {
    return this.authService.getAuthenticatedUser().pipe(
      map(user => user.uid),
      mergeMap(authId =>
        this.database.object(`/profiles/${authId}`).snapshotChanges()
      ),

      take(1),
      catchError(error => {
        console.log(
          '[DataService] getAuthenticatedUserProfile error - ',
          error
        );
        return of(null);
      })
    );
  }

  setUserOnline(profile: Profile, key?: string) {
    const ref = database().ref(`online-users/${key}`);
    console.log(key);
    try {
      ref.update({ ...profile });
      ref.onDisconnect().remove();
    } catch (error) {
      console.error(error);
    }
  }

  getOnlineUsers() {
    return this.database.list(`online-users`);
  }
}
