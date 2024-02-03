import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
@Output() selectedDocumentEvent = new EventEmitter();

documents = [
  new Document('1', 'CIT230 - Object Oriented Programming', 'Learn how to code Object Oriented Programming ', 'https://www.document.com/doc1'),
  new Document('2', 'WDD430 - Web Development Full Stack', 'Learn how to Web Development Full Stack', 'https://www.document.com/doc2'),
  new Document('3', 'CSE471 - User Experience Evalution Design', 'Learn how to use Figma and User Experience Evalution Design', 'https://www.document.com/doc3'),
  new Document('4', 'WDD 330 - Web Development 1', 'Learn how to code JS more in the depth.', 'https://www.document.com/doc4'),
];

onSelectedDocument(document: Document) {
  this.selectedDocumentEvent.emit(document);
}

}
