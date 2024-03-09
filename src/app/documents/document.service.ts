import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Document } from './document.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();

  private documentsUrl =
    'https://cms-database-789bb-default-rtdb.firebaseio.com/documents.json';
  private documents: Document[] = [];
  private maxDocumentId: number;

  constructor(private http: HttpClient) {}

  // GET 
  getDocuments(): Document[] {
    this.http
      .get<Document[]>(this.documentsUrl)
      .subscribe((documents: Document[]) => {
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        this.documents.sort((a, b) => {
          if (a < b) return -1;
          if (a > b) return 1;
          return 0;
        });
        this.documentListChangedEvent.next(this.documents.slice());
      });

    return this.documents.slice();
  }

  // PUT 
  storeDocuments() {
    this.http
      .put(this.documentsUrl, JSON.stringify(this.documents), {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .subscribe(() => {
        this.documents.sort((a, b) => {
          if (a < b) return -1;
          if (a > b) return 1;
          return 0;
        });
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }


  addDocument(newDocument: Document) {
    if (newDocument === null || newDocument === undefined) return;
    this.maxDocumentId++;
    newDocument.id = `${this.maxDocumentId}`;
    this.documents.push(newDocument);
    this.storeDocuments();
  }

  getDocument(id: string): Document {
    return this.documents.find((d) => d.id === id);
  }

  updateDocument(original: Document, newDocument: Document) {
    if (
      newDocument === null ||
      newDocument === undefined ||
      original === null ||
      original === undefined
    ) {
      return;
    }
    const pos = this.documents.indexOf(original);
    if (pos < 0) return;

    newDocument.id = original.id;
    this.documents[pos] = newDocument;
    this.storeDocuments();
  }

  deleteDocument(document: Document) {
    if (!document) return;
    const pos = this.documents.indexOf(document);
    if (pos < 0) return;
    this.documents.splice(pos, 1);
    this.storeDocuments();
  }

  getMaxId(): number {
    let maxId = 0;
    this.documents.forEach((d) => {
      if (+d.id > maxId) maxId = +d.id;
    });
    return maxId;
  }
}