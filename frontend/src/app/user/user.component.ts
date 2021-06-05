import { Component, Injectable, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/User.model';
import { UserService } from '../services/user.service';

@Injectable()

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  url = '';
  user_id = this.auth.getUserId();
  user!: User;
  likePending = false;
  likes = false;
  loading = false;
  errorMsg = '';

  constructor(private route: ActivatedRoute,
              private auth: AuthService,
              private router: Router,
              private user_serv: UserService) { }



  ngOnInit(): void {
    this.user_id;
    this.loading = true;
    this.route.params.subscribe(
      (params) => {
        console.log(params);
        this.user_serv.getUserById(params.id).then(
          (user: any) => {
            this.user = user;
            this.loading = false;
          }
        );
      }
    );
    this.user_id = sessionStorage.getItem('user_id');
  }

  onBack() {
    this.router.navigate(['/home']);
  }

  onModify() {
    this.router.navigate(['/modify-user/', this.user_id]);
  }

  onDelete() {
    this.loading = true;
    this.user_serv.deleteUser(this.user_id).then(
      (response: any) => {
        console.log(response.message);
        this.loading = false;
        this.router.navigate(['/home']);
      }
    ).catch(
      (error) => {
        this.loading = false;
        this.errorMsg = error.message;
        console.error(error);
      }
    );
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event) => {
        var url = event.target!.result;
        return url;
      }
    }
  }

}
