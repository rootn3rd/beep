import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-send-message-box',
  templateUrl: 'send-message-box.component.html'
})
export class SendMessageBoxComponent {
  content: string;

  @Output() sendMessage: EventEmitter<string>;
  constructor() {
    this.sendMessage = new EventEmitter();
  }

  handleSendMessage(content) {
    this.sendMessage.emit(content);
    this.content = '';
  }
}
