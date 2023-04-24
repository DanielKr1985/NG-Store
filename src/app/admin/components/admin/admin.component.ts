import { DialogModule } from '@angular/cdk/dialog';
import { Component,OnInit,AfterViewInit, ViewChild, Inject } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../../product/services/product.service';
import { IProduct } from '../../../shared/models';
import {MatDialog} from "@angular/material/dialog";
import { ProductFormComponent } from 'src/app/shared/components/product-form/product-form.component';
import { Subscription } from 'rxjs';




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

  public product?:IProduct;

  public dataTable=new MatTableDataSource<IProduct>();

  public displayedColumns: string[] = [];

  private sub: Subscription = new Subscription();

  constructor(private productService: ProductService,public dialog: MatDialog){}

  ngAfterViewInit() {
    if (this.sort)
      this.dataTable.sort = this.sort;
    if (this.paginator)
      this.dataTable.paginator = this.paginator;
  }

  ngOnInit(){
    this.productService.getProducts$().subscribe((data:any) => {

      //this.displayedColumns = Object.keys(data[0])
      this.displayedColumns = ['id', 'title', 'price', 'description','category','image','rating','star'];


      this.products=data.products;
      this.dataTable = new MatTableDataSource<IProduct>(data.products);
      if (this.sort)
      this.dataTable.sort = this.sort;
      if (this.paginator)
      this.dataTable.paginator = this.paginator;
      if (this.contextMenu){
        this.contextMenu.menuData = { 'element': Element };
        this.contextMenu.openMenu();
      }
      if (this.contextMenu?.menu)
        this.contextMenu.menu.focusFirstItem('mouse');
    })
    this.productService.fetchProducts();
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

public openDialog(): void {
  const dialogRef = this.dialog.open(ProductFormComponent, {});
  this.sub.add(
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      console.log('The dialog was closed');
      this.productService.addNewProduct(result);
    })
  );
}





}
