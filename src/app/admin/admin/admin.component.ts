import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product/services/product.service';
import { IProduct } from '../../shared/models';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit{

  public products:IProduct[]=[];

  constructor(private productService: ProductService){}

  ngOnInit(){
    this.productService.getProducts$().subscribe(data => {
      console.log("all products from admin",data)
      this.products=data;
    })
}

}
