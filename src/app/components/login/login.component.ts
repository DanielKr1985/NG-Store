import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthServiceService } from 'src/app/core/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public selectedOption = 'user';

  constructor(private authService: AuthServiceService) { }

  public onSubmit(loginForm:NgForm):void{
      this.authService.login(loginForm);
  }
}
