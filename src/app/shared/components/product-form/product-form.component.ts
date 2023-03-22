import { Component, Input } from '@angular/core';
import { ProductService } from 'src/app/product/services/product.service';
import { IProduct } from '../../models';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  @Input() product1?: IProduct;

}
