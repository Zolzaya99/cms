import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { ContactService } from '../../contacts/contact.service';
import { Contact } from '../../contacts/contact.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css'] 
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  messageSender: string;

  constructor(private contactService: ContactService,
    private router: Router) {}

//   ngOnInit() {
//      const contact: Contact = this.contactService.getContact(this.message.sender);
//      this.messageSender = contact.name;
//   }
// }

ngOnInit() {
  const contact: Contact = this.contactService.getContact(this.message.sender);
  if (contact) {
    this.messageSender = contact.name;
  }
  else {
    this.router.navigate(['/messages']);
  }
}
}