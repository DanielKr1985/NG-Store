import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/product/services/product.service';
import { IProduct } from 'src/app/shared/models';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent {

  public product?:IProduct;

  public id: string = '';

  constructor(private productService: ProductService, private route: ActivatedRoute){}

  ngOnInit(){

    this.route.params.subscribe(params => {
      this.id=params['id'];
    })

      this.productService.getSingleProduct$( this.id).subscribe(data => {
        console.log('this is the data',data);
          this.product = data;
    })
}

}
