import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../../product/services/product.service';
import { IProduct } from '../../../shared/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy{

  public products:IProduct[]=[];

  public isInCart(productId:number):Observable<boolean>{
    return this.productService.isProductInCart(productId)
  }

  constructor(private productService: ProductService){}

    ngOnDestroy(): void {
      // throw new Error('Method not implemented.');
    }

    ngOnInit(){
        this.productService.getProducts$().subscribe((data:any) => {
          console.log("all products",data.products)
          this.products=data.products;
        })
        this.productService.fetchProducts();
    }

    public addToCart(product:IProduct):void{
      this.productService.addToCart(product);
    }

    public removeFromCart(product:IProduct):void{
      this.productService.removeFromCart(product);
    }
}
