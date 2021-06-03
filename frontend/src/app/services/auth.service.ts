import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { User } from '../models/User.model';
import { stringify } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth$ = new BehaviorSubject<boolean>(false);
  user$ = new Subject<User[]>();

  private token: any;
  private user_id: any;

  constructor(private http: HttpClient,
              private router: Router) { }

  signUp(image_url: File, pseudo: string, email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/signup', {
        image_url: image_url,
        pseudo: pseudo,
        email: email,
        password: password
      }).subscribe(
        (user) => {
          resolve(user);
          console.log(user);
        },
        (error) => reject(error)
      );
    });
  }

  getToken() {
    let token = sessionStorage.getItem('token');
    return token;
  }

  getUserId() {
    this.user_id = sessionStorage.getItem('user_id');
    return this.user_id;
  }

  isLoggin() {
    let token = sessionStorage.getItem('token');
    if (typeof token === 'string' && token.length > 0) {
      this.isAuth$.next(true);
    }
  }

  signIn(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/signin',
      {email: email, password: password})
      .subscribe(
        (data: any) =>  {
          resolve(data);
          this.user_id = data.user_id;
          sessionStorage.setItem('user_id', data.user_id);
          this.token = data.token;
          sessionStorage.setItem('token', data.token);
          this.isAuth$.next(true);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  signOut() {
    this.token = null;
    this.user_id = null;
    this.isAuth$.next(false);
    window.location.reload();
    this.router.navigate(['/signin']);
  }

}
