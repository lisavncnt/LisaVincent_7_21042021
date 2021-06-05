import { Injectable } from '@angular/core';
import { User } from '../models/User.model';
import { Comment } from '../models/Comment.model';
import { Message } from '../models/Message.model';

import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  comments$ = new Subject<Comment[]>();
  isloggin = this.auth.isLoggin();
  id = sessionStorage.getItem('user_id');
  user!: User;
  message!: Message;

  constructor(private http: HttpClient,
    private auth: AuthService) { }

  createComment(content:string, user_id: string, post_id: string) {
    if (this.auth.isAuth$) {
      return new Promise((resolve, reject) => {
        this.http.post('http://localhost:3000/comments', {
        content: content,
        user_id: this.user.id,
        post_id: this.message.id,
      }).subscribe(
        (response: any) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      )
      });
    } else {
      return;
    }
  }

  getComments() {
    if (this.auth.isAuth$) {
      this.http.get('http://localhost:3000/comments').subscribe(
      (comments: any) => {
        this.comments$.next(comments);
      },
      (error) => {
        this.comments$.next([]);
        console.error(error);
      }
    );
    }
  }
}
