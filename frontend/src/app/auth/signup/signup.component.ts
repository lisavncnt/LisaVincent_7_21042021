import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: any;
  loading = false;
  errorMsg = '';

  constructor(private formBuilder: FormBuilder,
              private auth: AuthService,
              private router: Router) {

              }

  ngOnInit(): void {
      this.signupForm = this.formBuilder.group({
      pseudo: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  onSignup() {
    this.loading = true;
    let message = '';
    const pseudo = this.signupForm.get('pseudo').value;
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;

    this.auth.signUp(pseudo, email, password).then(
      (response: any) => {
        message = response.message;
        console.log(message);

        this.auth.signIn(email, password).then(
          () => {
            this.loading = false;
            this.router.navigate(['/home']);
          }
        ).catch(
          (error) => {
            this.loading = false;
            console.error(error);
            message = error.message;
            this.errorMsg = message;
          }
        )
      }
    ).catch(
      (error) => {
        this.loading = false;
        console.error(error);
        message = error.message;
        this.errorMsg = message;
      }
    );

  }

}
