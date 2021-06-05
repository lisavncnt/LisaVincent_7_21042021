import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm!: FormGroup;
  isAuth = '';
  errorMsg = '';
  token: any;
  user_id: any;

  constructor(private auth: AuthService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    })
  }

  onSignin() {
    this.auth.isAuth$.next(true);
    const email = this.signinForm.get('email')!.value;
    const password = this.signinForm.get('password')!.value;
    this.auth.signIn(email, password).then(
      () => {
        this.token = this.auth.getToken();
        this.user_id = this.auth.getUserId();
        this.auth.isAuth$.next(true);
        this.router.navigate(['/home']);
      }
    ).catch(
      (error) => {
        this.auth.isAuth$.next(false);
        this.errorMsg = error.message;
      }
    );
  }

}
