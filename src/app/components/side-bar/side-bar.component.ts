import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import {MatDialog} from "@angular/material/dialog";
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {

  constructor(public dialog: MatDialog){}

  @Input() isOpen:boolean = true;
  @Output() onCloseSidebar:EventEmitter<void> = new EventEmitter();


  /* constructor(private router: Router){
    this.router.nevigate(['/admin','']);
  } */

  public closeSidebar():void {
    this.onCloseSidebar.emit();
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {});
  }
}
