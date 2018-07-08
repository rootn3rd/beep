import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { ChatService } from '../../providers/chat/chat.service';
import { Message } from '../../models/messages/message';
import { AuthService } from '../../providers/auth/auth.service';

@Component({
  selector: 'app-last-message-list',
  templateUrl: 'last-message-list.component.html'
})
export class LastMessageListComponent implements OnInit {
  text: string;
  lastMessages$: Observable<Message[]>;

  currentUserId: string;
  constructor(
    private navCtrl: NavController,
    private chatService: ChatService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService
      .getAuthenticatedUser()
      .pipe()
      .subscribe(auth => (this.currentUserId = auth.uid));
    this.lastMessages$ = this.chatService.getLastMessages();
    // .subscribe(x => console.log('last message compoment:', x));
  }
  openChat(message: Message) {
    const currentUser = this.currentUserId;

    var selectedProfile = {};

    if (message.userToId == currentUser) {
      selectedProfile = {
        $key: message.userFromId,
        firstName: message.userFromProfile.firstName,
        lastName: message.userFromProfile.lastName
      };
    } else {
      selectedProfile = {
        $key: message.userToId,
        firstName: message.userToProfile.firstName,
        lastName: message.userToProfile.lastName
      };
    }

    this.navCtrl.push('MessagePage', { profile: selectedProfile });
  }
}
