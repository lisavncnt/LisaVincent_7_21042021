import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';

import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { MessagesService } from './services/messages.service';
import { ImagesService } from './services/images.service';
import { CommentsService } from './services/comments.service';

const app_routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: '**', redirectTo: 'dashboard'},
]

@NgModule({
  declarations: [
    AppComponent
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
