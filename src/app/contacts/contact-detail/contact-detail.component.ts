import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'] // Change styleUrl to styleUrls
})
export class ContactDetailComponent implements OnInit { // Fixing the implementation of OnInit
  contact: Contact;
  id: string;

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() { 
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.contact = this.contactService.getContact(this.id);
    });
  }
  onDelete() {
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['/contacts']); // Route back to the '/contacts' URL
  }
  navigateBackToContactList() {
    // Define the URL path to the ContactListComponent
    const contactListPath = '/contacts';

    // Navigate back to the ContactListComponent
    this.router.navigateByUrl(contactListPath);
  }
}

