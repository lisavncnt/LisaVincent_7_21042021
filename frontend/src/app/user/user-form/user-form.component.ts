import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/User.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  userForm: any;
  mode = '';
  loading = false;
  user!: User;
  errorMsg = '';
  imagePreview = '';



  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private user_serv: UserService,
    private auth: AuthService) {
      this.userForm = new FormGroup({
        imageInput: new FormControl(),
        pseudo: new FormControl(),
        email: new FormControl(),
        password: new FormControl(),
      });
     }

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe(
      (params) => {
        if (!params.id) {
          this.mode = 'new';
          this.initEmptyForm();
          this.loading = false;
        } else {
          this.mode = 'edit';
          this.user_serv.getUserById(params.id).then(
            (user: any) => {
              this.user = user;
              this.initModifyForm(user);
              this.loading = false;
            }
          ).catch(
            (error) => {
              this.errorMsg = JSON.stringify(error);
            }
          );
        }
      }
    );
  }

  initEmptyForm() {
    this.userForm = this.fb.group({
      pseudo: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]],
      image_url: [null, Validators.required],
    });
  }

  initModifyForm(user: User) {
    this.userForm = this.fb.group({
      pseudo: [this.user.pseudo, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      password: [this.user.password, [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]],
      image_url: [this.user.image_url, Validators.required],
    });
    this.imagePreview = this.user.image_url;
  }

  onSubmit() {
    this.loading = true;
    const newUser = new User();
    newUser.pseudo = this.userForm.get('pseudo')?.value;
    newUser.email = this.userForm.get('email')?.value;
    newUser.password = this.userForm.get('password')?.value;
    newUser.user_id = this.auth.getUserId();
    if(this.mode === 'new') {
      this.auth.createUser(newUser, this.userForm.get('image_url')?.value).then(
        (response: any) => {
          console.log(response.message);
          this.loading = false;
          this.router.navigate(['/home']);
        }
      ).catch(
        (error) => {
          console.error(error);
          this.loading = false;
          this.errorMsg = error.message;
        }
      );
    } else if (this.mode === 'edit') {
      this.user_serv.modifyUser(this.user.id, newUser, this.userForm.get('image_url')?.value).then(
        (response: any) => {
          console.log(response.message);
          this.loading = false;
          this.router.navigate(['/home']);
        }
      ).catch(
        (error) => {
          console.error(error);
          this.loading = false;
          this.errorMsg = error.message;
        }
      );
    }
  }

  onFileAdded(event: any) {
    const file = <File>event.target.files[0];
    this.userForm.get('image_url')?.setValue(file);
    this.userForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

}
