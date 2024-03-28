import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();
  messageListChangedEvent = new Subject<Message[]>();

  private messagesUrl =
    'https://localhost:3000/messages';
  private messages: Message[] = [];
  private maxMessageId: number;

  constructor(private http: HttpClient) {}
  
  // GET MESSAGES
  getMessages(): Message[] {
    this.http.get<Message[]>(this.messagesUrl).subscribe((msgs: Message[]) => {
      this.messages = msgs;
      this.maxMessageId = this.getMaxId();
      this.messages.sort((a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      });
      this.messageChangedEvent.next(this.messages.slice());
    });

    return this.messages.slice();
  }

  // PUT MESSAGES 
  storeMessages() {
    this.http
      .put(this.messagesUrl, JSON.stringify(this.messages), {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .subscribe(() => {
        this.messages.sort((a, b) => {
          if (a < b) return -1;
          if (a > b) return 1;
          return 0;
        });
        this.messageChangedEvent.next(this.messages.slice());
      });
  }

  getMessage(id: string): Message {
    return this.messages.find((c) => c.id === id);
  } 
  
  addMessage(newMessage: Message) {
    if (newMessage === null || newMessage === undefined) return;
    this.maxMessageId++;
    newMessage.id = `${this.maxMessageId}`;
    this.messages.push(newMessage);
    this.storeMessages();
  }

  getMaxId(): number {
    let maxId = 0;
    this.messages.forEach((m) => {
      if (+m.id > maxId) maxId = +m.id;
    });
    return maxId;
  }
}


