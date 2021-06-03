import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from '../models/Message.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  messages$ = new Subject<Message[]>();
  isloggin = this.auth.isLoggin();
  id = '';
  user = User;

  constructor(private auth: AuthService,
              private http: HttpClient) { }

  getAll() {
    if (this.auth.isAuth$) {
      this.http.get('http://localhost:3000/messages').subscribe(
        (messages: any) => {
          this.messages$.next(messages);
        },
        (error) => {
          this.messages$.next([]);
          console.error(error);
        }
      )
    }
  };
}
