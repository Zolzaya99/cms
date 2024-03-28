import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();

  private contactsUrl = 
  'https://localhost:3000/contacts';
  private contacts: Contact[] = [];
  private maxContactId: number;

  constructor(private http: HttpClient) {}

// GET CONTACTS
  getContacts(): Contact[] {
    this.http
      .get<Contact[]>(this.contactsUrl)
      .subscribe((contacts: Contact[]) => {
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();
        this.contacts.sort((a, b) => {
          if (a < b) return -1;
          if (a > b) return 1;
          return 0;
        });
        this.contactListChangedEvent.next(this.contacts.slice());
      });
    return this.contacts.slice();
  }

// PUT CONTACTS
  storeContacts() {
    this.http
      .put(this.contactsUrl, JSON.stringify(this.contacts), {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .subscribe(() => {
        this.contacts.sort((a, b) => {
          if (a < b) return -1;
          if (a > b) return 1;
          return 0;
        });
        this.contactListChangedEvent.next(this.contacts.slice());
      });
  }


  getContact(id: string): Contact {
    return this.contacts.find((c) => c.id === id);
  }

  deleteContact(contact: Contact) {
    if (!contact) return;
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) return;
    this.contacts.splice(pos, 1);
    // this.contactListChangedEvent.next(this.contacts.slice());
    this.storeContacts();

  }

  getMaxId(): number {
    let maxId = 0;
    this.contacts.forEach((c) => {
      if (+c.id > maxId) maxId = +c.id;
    });
    return maxId;
  }

  addContact(newContact: Contact) {
    if (newContact === null || newContact === undefined) return;
    this.maxContactId++;
    newContact.id = `${this.maxContactId}`;
    this.contacts.push(newContact);
    // this.contactListChangedEvent.next(this.contacts.slice());
    this.storeContacts();

  }

  updateContact(original: Contact, newContact: Contact) {
    if (
      newContact === null ||
      newContact === undefined ||
      original === null ||
      original === undefined
    ) {
      return;
    }
    const pos = this.contacts.indexOf(original);
    if (pos < 0) return;

    newContact.id = original.id;
    this.contacts[pos] = newContact;
    // this.contactListChangedEvent.next(this.contacts.slice());
    this.storeContacts();

  }
}
