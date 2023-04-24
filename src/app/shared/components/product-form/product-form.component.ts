import { Component, EventEmitter, Inject,Input,Output  } from '@angular/core';
import { ProductService } from 'src/app/product/services/product.service';
import { IProduct } from '../../models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminComponent } from 'src/app/admin/components/admin/admin.component';


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

  @Output() onSubmit: EventEmitter<IProduct> = new EventEmitter();

  constructor(public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: IProduct){
    this.initForm(this.product);
  }



  private _product:IProduct;

get product():IProduct{
  return this._product;
}

  public productForm?: FormGroup ;

  ngOnInint(){
    if (this.dialogData) {
      this.product = this.dialogData;
    }

      this.initForm(this.product);

  }

  private prePopulateForm(product:IProduct):void{
    this.productForm.patchValue({title:product.title});
    this.productForm.patchValue({id:product.id});
    this.productForm.patchValue({description:product.description});
    this.productForm.patchValue({price:product.price});
    this.productForm.patchValue({rating:product.rating});
    this.productForm.patchValue({brand:product.brand});
    this.productForm.patchValue({category:product.category});


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

  public Submit():void{
    if (this.productForm.valid){
      this.product.title = this.productForm.value.title;
      this.product.price = this.productForm.value.price;
      //this.product.category = this.productForm.value.category
      this.product.description = this.productForm.value.description;
      this.product.rating = this.productForm.value.rating;
      if (this.dialogRef) {
        this.dialogRef.close(this.product);
      } else {
        this.onSubmit.emit(this.product);
      }

    }
  }

}
