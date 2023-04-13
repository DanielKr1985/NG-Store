import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthServiceService } from 'src/app/core/services/auth-service.service';
import { Iuser } from 'src/app/shared/models/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public selectedOption = 'user';
  public user:Iuser = {
    email: '', password: '',
    role: ''
  };

  constructor(private authService: AuthServiceService) { }

  public onSubmit(loginForm:NgForm):void{
    this.user.email = loginForm.form.value.email;
    this.user.password = loginForm.form.value.password;
    this.user.role = loginForm.form.value.role;
    this.authService.login(this.user);
  }
}
