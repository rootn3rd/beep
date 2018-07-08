import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from 'ionic-angular';
import { ChatService } from '../../providers/chat/chat.service';
import { Observable } from 'rxjs';
import { Channel } from '../../models/channel/channel';

@IonicPage()
@Component({
  selector: 'page-channels',
  templateUrl: 'channels.html'
})
export class ChannelsPage {
  channelList: Observable<Channel[]>;

  constructor(
    private alertCtrl: AlertController,
    private chatService: ChatService,
    private navCtrl: NavController,
    private navParams: NavParams
  ) {
    // this.getChannelsList();
  }

  ionViewWillLoad() {
    //get channels list
    this.getChannelsList();
  }

  getChannelsList() {
    this.channelList = this.chatService.getChannels(); //
    // this.chatService.getChannels().subscribe(x => console.log(x));
  }

  showAddChannelDialog() {
    this.alertCtrl
      .create({
        title: 'Channel Name',
        inputs: [
          {
            name: 'channelName'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'Cancel'
          },
          {
            text: 'Add',
            handler: data => {
              this.chatService.addChannel(data.channelName);
            }
          }
        ]
      })
      .present();
  }

  selectChannel(channel: Channel) {
    this.navCtrl.push('ChannelChatPage', { channel });
  }
}
