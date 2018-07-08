import { Component, Input } from '@angular/core';
import { Message } from '../../models/messages/message';

@Component({
  selector: 'app-chat-message',
  templateUrl: 'chat-message.component.html'
})
export class ChatMessageComponent {
  text: string;

  @Input() chatMessage: Message;
  // @Input() chatIndex: number;
  @Input() userId: string;

  constructor() {}
}
