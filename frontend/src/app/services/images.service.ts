import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Img } from '../models/Image.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  images$ = new Subject<Img[]>();
  isloggin = this.auth.isLoggin();

  constructor(private http: HttpClient,
              private auth: AuthService) { }

  getAllImages() {
    this.http.get('http://localhost:3000/images').subscribe(
      (images: any) => {
        this.images$.next(images);
      },
      (error) => {
        this.images$.next([]);
        console.error(error);
      }
    );
  }

  getImagesById(id: string){
    if (this.auth.isAuth$) {
      return new Promise((resolve, reject) => {
        this.http.get('http://localhost:3000/images/' + id).subscribe(
          (image: any) => {
            resolve(image);
          },
          (error) => {
            reject(error);
          }
        );
      });
    } else {
      return;
    }
  }

  createImage(image: Img, image_url: File) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      let body = image;
      formData.append('title', body.title);
      formData.append('image_url', image_url);
      formData.append('user_id', JSON.parse(sessionStorage.getItem('user_id') || '{}'));
      this.http.post('http://localhost:3000/dashboard/images/add', formData).subscribe(
        (response: any) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      )
    });
  }

  modifyImage(id: string, image: Img, image_url: string | File) {
    return new Promise((resolve, reject) => {
      if (typeof image_url === 'string') {
        this.http.put('http://localhost:3000/images/' + id, image).subscribe(
          (response: any) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        const formData = new FormData();
        formData.append('images', JSON.stringify(image));
        formData.append('image', image_url);
        this.http.put('http:localhost:3000/images/' + id, formData).subscribe(
          (response: any) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      }
    });
  }

  deleteImage(id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete('http://localhost:3000/images/' + id).subscribe(
        (response: any) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  likeImage(id:string, like:boolean) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/images/' + id + '/like',
      {
        user_id: sessionStorage.getItem('user_id'),
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
  }

  dislikeImage(id: string, dislike: boolean) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/images' + id + '/like',
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
  }

}
