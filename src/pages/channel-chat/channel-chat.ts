import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Channel } from '../../models/channel/channel';
import { ChatService } from '../../providers/chat/chat.service';
import { ChannelMessage } from '../../models/channel/channel-message';
import { Observable } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-channel-chat',
  templateUrl: 'channel-chat.html'
})
export class ChannelChatPage {
  channel: Channel;
  channelMessages: Observable<ChannelMessage[]>;

  constructor(
    private chatService: ChatService,
    private navCtrl: NavController,
    private navParams: NavParams
  ) {}

  ionViewWillLoad() {
    this.channel = this.navParams.get('channel');
    this.channelMessages = this.chatService.getChannelChats(this.channel.key$);
  }

  handleSendMessage(content: string) {
    let channelMessage: ChannelMessage = {
      content: content
    };

    this.chatService.sendChannelChatMessage(this.channel.key$, channelMessage);
  }
}
