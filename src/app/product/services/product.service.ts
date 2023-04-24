import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, Subject } from 'rxjs';
import { Routes } from 'src/app/core/http/API';
import { StorageService } from 'src/app/core/services/storage.service';
import { IProduct } from '../../shared/models';

import * as uuid from 'uuid';
import { DeleteCartItem, SetCartItem } from 'src/app/core/state/product/product.actions';
import { Store } from '@ngxs/store';
import { ProductStateSelectors } from 'src/app/core/state/product/product.selectors';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient,
    private storageService: StorageService,private store: Store) { }

  private productsSubject$:BehaviorSubject<IProduct[]> = new BehaviorSubject([]);


  public getProducts$(): Observable<IProduct[]>{

    this.fetchProducts();
    return this.productsSubject$.asObservable();
  }

  public getSingleProduct$(productId: string): Observable<IProduct>{

    const httpOptions = {
    headers: new HttpHeaders({
      "Content-Type":'application/json',
      accept: "application/json",
      "Access-Control-Allow-Headers": 'Content-Type',
      "Access-Control-Allow-Origin": '*'
    })
  };

    return this.http.get<IProduct>(Routes["singleProduct"](productId),httpOptions)
  }

  public fetchProducts():void{
    const exisitingData:IProduct[] = this.storageService.getData('products');
    if (exisitingData){
      this.productsSubject$.next(exisitingData);
    }
    else{
      this.http.get<IProduct[]>(Routes['allProducts']).subscribe((data:any) =>{
        this.storageService.setData('products',data);
        this.productsSubject$.next(data);
        //this.storageService.setData('products',data)
      })
    }

  }

  public onProductChange(newProduct: IProduct) {
    const productsList = this.productsSubject$.value;

    const productIndex: number = productsList.findIndex(
      (product) => product.id === newProduct.id
    );

    productsList[productIndex] = newProduct;

    this.storageService.setData('products', productsList);

    this.fetchProducts();
  }

  public getProductById(id: number): IProduct {
    this.fetchProducts();
    debugger;
    const productsList = this.productsSubject$.value;

    const productIndex: number = productsList.findIndex(
      (product) => product.id === Number(id)
    );

    if (productsList[productIndex]) {
      return productsList[productIndex];
    } else {
      return null;
    }
  }

  public addNewProduct(result: IProduct): void {
    const productsList = this.productsSubject$.value;

    result.id = uuid.v4(); // productsList.length + 1; // OR generate random id


    productsList.push(result);
    this.storageService.setData('products', productsList);

    this.fetchProducts();
  }

  public addToCart(product:IProduct){
    this.store.dispatch(new SetCartItem(product));
  }

  public removeFromCart(product:IProduct){
    this.store.dispatch(new DeleteCartItem(product.id));
  }

  public isProductInCart(productId:number):Observable<boolean>{
    return this.store.select(ProductStateSelectors.cartItems).pipe(map(data => {
      const isInCart = data.some(Item => Item.id === productId)
      return isInCart
    }));
  }

}
