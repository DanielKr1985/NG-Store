import { Component,OnInit,AfterViewInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../../product/services/product.service';
import { IProduct } from '../../../shared/models';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, AfterViewInit{

  contextMenuPosition = { x: '0px', y: '0px' };

  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  public contextMenu?: MatMenuTrigger;

  public products:IProduct[]=[];

  public dataTable=new MatTableDataSource<IProduct>();

  public displayedColumns: string[] = [];

  constructor(private productService: ProductService){}

  ngAfterViewInit() {
    if (this.sort)
      this.dataTable.sort = this.sort;
    if (this.paginator)
      this.dataTable.paginator = this.paginator;
  }

  ngOnInit(){
    this.productService.getProducts$().subscribe(data => {
      console.log("all products from admin",data)
      this.displayedColumns = Object.keys(data[0])
      this.products=data;
      this.dataTable = new MatTableDataSource<IProduct>(data);
      if (this.sort)
      this.dataTable.sort = this.sort;
      if (this.paginator)
      this.dataTable.paginator = this.paginator;
    })
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataTable.filter = filterValue.trim().toLowerCase();
}

onContextMenu(event: MouseEvent, element: Element) {
  event.preventDefault();
  this.contextMenuPosition.x = event.clientX + 'px';
  this.contextMenuPosition.y = event.clientY + 'px';
  if (this.contextMenu){
    this.contextMenu.menuData = { 'element': Element };
    this.contextMenu.openMenu();
  }
  if (this.contextMenu?.menu)
    this.contextMenu.menu.focusFirstItem('mouse');
}

/* onContextMenuAction1('element': Element) {
  alert(`Click on Action 1 for ${Element.title}`);
}

onContextMenuAction2('element': Element) {
  alert(`Click on Action 2 for ${Element.category}`);
} */


}
