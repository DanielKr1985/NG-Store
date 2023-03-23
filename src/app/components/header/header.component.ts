import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/material/material.module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  public sidebarOpen: boolean = false;

  public openSidebar():void{
    this.sidebarOpen=true;
  }

  public closeSidebar():void{
    this.sidebarOpen=false;
  }
}
