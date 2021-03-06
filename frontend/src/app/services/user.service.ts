import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User.model';
import { AuthService } from './auth.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user_id = this.auth.getUserId();
  users$ = new Subject<User[]>();

  constructor(private http :HttpClient,
    private auth: AuthService) { }

    getUsers() {
      this.http.get('http://localhost:3000/users').subscribe(
        (users: any) => {
          this.users$.next(users);
        },
        (error) => {
          this.users$.next([]);
          console.error(error);
        }
      );
    }

    getUserById(id: string) {
      return new Promise((resolve, reject) => {
        this.http.get('http://localhost:3000/user/'+ id).subscribe(
          (user: any) => {
            resolve(user);
          },
          (error) => {
            reject(error);
          }
        );
      });
    }

    modifyUser(id: string, user: User, image_url: string | File) {
      return new Promise((resolve, reject) => {
        if (typeof image_url === 'string') {
          this.http.put('http://localhost:3000/user/' + id, user).subscribe(
            (response: any) => {
              resolve(response);
              window.location.reload();
            },
            (error) => {
              reject(error);
            }
          );
        }
      });
    }

    deleteUser(id: string) {
      return new Promise((resolve, reject) => {
        this.http.delete('http://localhost:3000/user/' + id).subscribe(
          (response: any) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      });
    }

    public uploadImage(image_url: File): Observable<any> {
      const formData = new FormData();

      formData.append('image_url', image_url);

     return this.http.post('http://localhost:3000/user', formData);
    }
}
