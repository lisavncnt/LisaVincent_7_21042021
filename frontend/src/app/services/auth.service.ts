import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { User } from '../models/User.model';

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

  createUser(user: User, image_url: File) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('user', JSON.stringify(user));
      formData.append('image_url', image_url);
      this.http.post('http://localhost:3000/users/', formData).subscribe(
        (response: any) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  signUp(pseudo: string, email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/signup', {
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
      {email: email, password})
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
