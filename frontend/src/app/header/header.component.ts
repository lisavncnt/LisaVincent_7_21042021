import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MessagesService } from '../services/messages.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/User.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth!: boolean;
  id = sessionStorage.getItem('user_id');
  authToken = sessionStorage.getItem('token');
  user!: User;

  constructor(private auth: AuthService,
    private router: Router,
    private serv_user: UserService,
    private serv_msg: MessagesService) { }

  ngOnInit(): void {
    this.getAuth();
    this.serv_user.getUserById(this.id!);
  }

  getAuth() {
    if (this.authToken) {
      console.log(this.authToken);
      this.isAuth = true;
    } else {
      this.isAuth = false;
    }
  }

  onClickUser() {
    this.serv_user.getUserById(this.id!);
    this.router.navigate(['user', this.id]);
  }

  getAll() {
    this.serv_msg.getAllMessages();
  }

  onSignout() {
    this.auth.signOut();
    sessionStorage.clear();
    window.location.reload();
    this.router.navigate(['auth/', 'signin']);
  }
}
