import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tabsConfig: any;

  constructor() {
    this.tabsConfig = [
      { pageName: 'InboxPage', title: 'Inbox', icon: 'mail' },
      { pageName: 'ChannelsPage', title: 'Channels', icon: 'contacts' },
      { pageName: 'ProfilePage', title: 'Profile', icon: 'person' }
    ];
  }
}
