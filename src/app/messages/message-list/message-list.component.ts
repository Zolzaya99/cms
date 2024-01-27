import { Component } from '@angular/core';
import { Message } from '../message.model'
@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {
  // this  is my sample messages
  messages: Message[] = [
    new Message('1', 'msg1', 'Hi, I need help with an assignment', 'Peter'), 
    new Message('2', 'msg2', 'Do you have any time to meet and help me out?', 'Jessica'), 
    new Message('3', 'msg3', 'I was wondering if you were able to check my resubmission?', 'Conner'),
  ];

  constructor() {}

  ngOnInit():void{}

  // this is for adding a message to the message list
  onAddMessage(message: Message) {
    this.messages.push(message);
}
}
