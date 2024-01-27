import { Component, ElementRef, EventEmitter, ViewChild, Output } from '@angular/core';
import { Message } from '../message.model'
@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent {
  // custom eventEmitter to output the new message object up to the messagelistComponent
  @Output() addMessageEvent = new EventEmitter<Message>();

  // Define a local reference variable named subject for the subject input tag
  // and a local reference variable named msgText for the message input tag.
  // Use the @ViewChild property decorator to create an ElementRef for the subject and 
  // msgText input elements in the DOM at the top of the MessageEditComponent class.
  @ViewChild('subject') subject: ElementRef;
  @ViewChild('msgText') msgText: ElementRef;
  
  constructor() {}

  ngOnInit():void {}

  currentSender: string = "Zolzaya Wadsworth";

  onSendMessage() {
    //Get the value stored in the subject input element
    const subject = this.subject.nativeElement.value;
    // Get the value stored in the msgText input element
    const msgText = this.msgText.nativeElement.value;
    // Assign a hardcoded number to the id property of the new Message object
    const message = new Message ('1', subject, msgText, this.currentSender);
    // Call the addMessageEvent emitter’s emit() method and pass it the new Message object just created
    this.addMessageEvent.emit(message);
  }
  onClear() {
    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';
  }
}
