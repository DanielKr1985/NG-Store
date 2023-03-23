import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  @Input() isOpen:boolean = true;
  @Output() onCloseSidebar:EventEmitter<void> = new EventEmitter();

  /* constructor(private router: Router){
    this.router.nevigate(['/admin','']);
  } */

  public closeSidebar():void {
    this.onCloseSidebar.emit();
  }
}
