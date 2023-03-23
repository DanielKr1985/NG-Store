import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StorageService } from './storage.service';
import { Observable, of, Subject } from 'rxjs';
import { Iuser } from 'src/app/shared/models/user.interface';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private isAuth$:Subject<boolean> = new Subject();
  constructor(private storageServices:StorageService) { }

  public login(user:Iuser):void{
    if (user){
      this.storageServices.setData('user',user);
      this.isAuth$.next(true);
    }
  }

  public getUser(): Iuser{
    const user:Iuser = this.storageServices.getData('user');
    return user;
  }


  /* public login(loginForm:NgForm):void{
    console.log(loginForm.form.value.email);
  } */
}
