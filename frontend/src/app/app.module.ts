import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CanActivate } from '@angular/router';


import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { MessagesListComponent } from './home/messages-list/messages-list.component';
import { UserFormComponent } from './user/user-form/user-form.component';

import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { MessagesService } from './services/messages.service';
import { ImagesService } from './services/images.service';
import { CommentsService } from './services/comments.service';

const app_routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: '**', redirectTo: 'dashboard'},

  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'user/:id', canActivate: [AuthGuardService], component: UserComponent},
  { path: 'modify-user/:id', canActivate:[AuthGuardService], component: UserFormComponent},

  { path: 'home', canActivate: [AuthGuardService], component: HomeComponent },
  { path: 'messages', canActivate: [AuthGuardService], component: MessagesListComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    HeaderComponent,
    HomeComponent,
    MessagesListComponent,
    UserComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(app_routes),
  ],
  providers: [ AuthService, AuthGuardService, MessagesService, ImagesService, CommentsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
