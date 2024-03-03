import { EventEmitter, Injectable } from '@angular/core';
import { Document } from '../documents/document.model'
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentListChangedEvent = new Subject<Document[]>();
  documentSelectedEvent = new EventEmitter<Document>();
  
  private documents: Document [] = [];
  private maxDocumentId: number;


  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    return this.documents.find((d) => d.id === id);
   } 
   
  // add
  addDocument(newDocument: Document) {
   if(!newDocument) {
        return;
    }
   this.maxDocumentId++;
   newDocument.id = this.maxDocumentId.toString();
   this.documents.push(newDocument);
  //  const documentsListClone = this.documents.slice();
   this.documentListChangedEvent.next(this.documents.slice());
}

// update
  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }
    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
}

// delete
  deleteDocument(document: Document) {
  if (!document) {
      return;
  }
  const pos = this.documents.indexOf(document);
  if (pos < 0) {
      return;
  }
  this.documents.splice(pos, 1)
  // const documentsListClone = this.documents.slice()
  // this.documentListChangedEvent.next(documentsListClone);
  this.documentListChangedEvent.next(this.documents.slice());

}

  getMaxId(): number {
    let maxId = 0; 
    this.documents.forEach((d) => {
      if (+d.id > maxId) maxId = +d.id;
    });
    return maxId;
  }


}
