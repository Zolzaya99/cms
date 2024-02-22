import { EventEmitter, Injectable } from '@angular/core';
import { Document } from '../documents/document.model'
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  maxDocumentId: number;
  documentListChangedEvent = new Subject<Document[]>();
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  private documents: Document [] = [];

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    return this.documents.find((c) => c.id === id);
   } 
   
  // add
  addDocument(newDocument: Document) {
   if(!newDocument) {
        return;
    }

   this.maxDocumentId++;
   newDocument.id = this.maxDocumentId.toString();
   this.documents.push(newDocument);
   const documentsListClone = this.documents.slice();
   this.documentListChangedEvent.next(documentsListClone);
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
  const documentsListClone = this.documents.slice()
  this.documentChangedEvent.next(documentsListClone);
}

  getMaxId(): number {
    let maxId = 0; 

    for (const document of this.documents) {
        const currentId = Number(document.id); 
        if (!isNaN(currentId) && currentId > maxId) { 
            maxId = currentId; 
        }
    }

    return maxId;
  }


}
