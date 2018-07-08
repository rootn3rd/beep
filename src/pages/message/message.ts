import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Profile } from '../../models/profile/profile';
import { Message } from '../../models/messages/message';
import { AuthService } from '../../providers/auth/auth.service';
import { DataService } from '../../providers/data/data.service';
import { ChatService } from '../../providers/chat/chat.service';

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html'
})
export class MessagePage {
  selectedProfile: Profile;
  userId: string;
  currentProfile: Profile;

  messageList: Message[];

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private dataService: DataService,
    private navCtrl: NavController,
    private navParams: NavParams
  ) {}

  ionViewWillLoad() {
    this.selectedProfile = this.navParams.get('profile');

    // this.authService
    //   .getAuthenticatedUser()
    //   .pipe()
    //   .subscribe(auth => (this.userId = auth.uid));

    this.dataService
      .getAuthenticatedUserProfile()
      .pipe()
      .subscribe(profile => {
        console.log('Current Profile: ', profile);
        if (profile) {
          this.currentProfile = { $key: profile.key, ...profile.payload.val() };
          this.userId = profile.key;
        }
      });

    this.chatService.getChats(this.selectedProfile.$key).subscribe(x => {
      console.log('Chat Service returning: ', x);
      this.messageList = <Message[]>x;
    });
  }

  async sendMessage(content: string) {
    try {
      const message: Message = {
        userToId: this.selectedProfile.$key,
        userToProfile: {
          firstName: this.selectedProfile.firstName,
          lastName: this.selectedProfile.lastName
        },
        userFromId: this.userId,
        userFromProfile: {
          firstName: this.currentProfile.firstName,
          lastName: this.currentProfile.lastName
        },
        content: content
      };

      console.log(message);
      await this.chatService.sendChat(message);
    } catch (error) {
      console.error(error);
    }
  }
}
