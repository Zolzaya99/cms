import { Component } from '@angular/core';
import { Message } from './message.model';
import { MessageService } from './message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  selectedMessage: Message;
  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.messageChangedEvent
    .subscribe(
      (message: Message) => {
        this.selectedMessage = message;
      }
    );
  }
}
