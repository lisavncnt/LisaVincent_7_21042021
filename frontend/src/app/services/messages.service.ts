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

  getAllMessages() {
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

  getMessageById(id: string) {
    if (this.auth.isAuth$) {
      return new Promise((resolve, reject) => {
        this.http.get('http://localhost:3000/messages/' + id)
        .subscribe(
          (message: any) => {
            resolve(message);
          },
          (error) => {
            reject(error);
          }
        );
      });
    } else {
      return;
    }
  };

  createMessage(title: string, content: string) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/messages/add', {
        title: title,
        content: content,
        user_id: sessionStorage.getItem('user_id'),
      }).subscribe(
        (response: any) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  modifyMessage(id: string, message: Message) {
    return new Promise((resolve, reject) => {
      this.http.put('http://localhost:3000/messages/' + id, message).subscribe(
        (response: any) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
      const formData = new FormData();
      formData.append('message', JSON.stringify(message));
      this.http.put('http://localhost:3000/messages/' + id, formData).subscribe(
        (response: any) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  deleteMessage(id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete('http://localhost:3000/messages/' + id).subscribe(
        (response : any) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  likeMessage(id: string, like: boolean) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/messages/' + id + '/like',
      {
        user_id: sessionStorage.getItem('user_id'),
        id: id,
        like: like ? 1 : 0
      })
      .subscribe(
        (response: any) => {
          resolve(like);
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  dislikeMessage(id: string, dislike: boolean) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/messages' + id + '/like',
      {
        user_id: sessionStorage.getItem('user_id'),
        like: dislike ? -1 : 0
      })
      .subscribe(
        (response: any) => {
          resolve(dislike);
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

}
