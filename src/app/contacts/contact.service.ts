import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  maxContactId: number;
  contactListChangedEvent = new Subject<Contact[]>();
  // contactSelectedEvent = new EventEmitter<Contact>();
  // contactChangedEvent = new EventEmitter<Contact[]>(); 
  private contacts: Contact[] = [];

  constructor() {
    this.contacts = MOCKCONTACTS.slice(); 
  }

  getContacts(): Contact[] {
    return this.contacts.slice(); 
  }

  getContact(id: string): Contact {
    return this.contacts.find((c) => c.id === id);
  }

  // add
  addContact(newContact: Contact) {
    if(!newContact) {
         return;
     }
 
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    const contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);
 }

   // update
  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }
    const pos = this.contacts.indexOf(originalContact)
    if (pos < 0) {
      return;
    }
  }

  // delete
  deleteContact(contact: Contact): void {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    const contactsListClone = this.contacts.slice();        
    this.contactListChangedEvent.next(contactsListClone); 
  }
}

