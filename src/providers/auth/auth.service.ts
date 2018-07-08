import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Account } from '../../models/account/account';
import { LoginResponse } from '../../models/login/login-response';

@Injectable()
export class AuthService {
  constructor(public afAuth: AngularFireAuth) {}

  getAuthenticatedUser() {
    return this.afAuth.authState;
  }

  async createUserWithEmailAndPassword(account: Account) {
    try {
      return <LoginResponse>{
        result: await this.afAuth.auth.createUserWithEmailAndPassword(
          account.email,
          account.password
        )
      };
    } catch (error) {
      return <LoginResponse>{
        error: error
      };
    }
  }

  async signInWithEmailAndPassword(account: Account) {
    try {
      return <LoginResponse>{
        result: await this.afAuth.auth.signInWithEmailAndPassword(
          account.email,
          account.password
        )
      };
    } catch (error) {
      return <LoginResponse>{
        error: error
      };
    }
  }

  signOut() {
    this.afAuth.auth.signOut();
  }
}
