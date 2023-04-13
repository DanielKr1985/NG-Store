import { Component, Input } from '@angular/core';
import { ProductService } from 'src/app/product/services/product.service';
import { IProduct } from '../../models';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {

  public isValidForm: boolean = false;

  @Input() set product (product:IProduct){
    if (this.productForm){
      this.prePopulateForm(product);
    }

    this._product=product;
  }

  constructor(){
    this.initForm(this.product);
  }



  private _product:IProduct;

get product():IProduct{
  return this._product;
}

  public productForm?: FormGroup ;

  ngOnInint(){


      this.initForm(this.product);

  }

  private prePopulateForm(product:IProduct):void{
    this.productForm.patchValue({title:product.title});
    this.productForm.patchValue({id:product.id});
    this.productForm.patchValue({description:product.description});
    this.productForm.patchValue({price:product.price});
    this.productForm.patchValue({rating:product.rating});
    this.productForm.patchValue({brand:product.brand});
  }

  public getControl(control: string): FormControl {
    return this.productForm.controls[control] as FormControl;
  }

  private initForm(product1:IProduct):void{
    //initialize the product form
      this.productForm = new FormGroup({
        title:new FormControl("",[Validators.required,Validators.minLength(10),]),
        id:new FormControl("",[Validators.required]),
        description:new FormControl("",[Validators.required]),
        price:new FormControl("",[Validators.required]),
        category:new FormControl(""),
        rating:new FormControl(""),
        brand:new FormControl("",[Validators.required]),
      });


  }

  public onSubmit():void{
    if (this.productForm.valid){
      console.log('submit');
    }
  }

}
