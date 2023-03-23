import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Routes } from 'src/app/core/http/API';
import { StorageService } from 'src/app/core/services/storage.service';
import { IProduct } from '../../shared/models';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient,
    private storageService: StorageService) { }

  private productsSubject$:Subject<IProduct[]> = new Subject();

  public getProducts$(): Observable<IProduct[]>{

    /* const httpOptions = {
    headers: new HttpHeaders({
      "Content-Type":'application/json',
      accept: "application/json",
      "Access-Control-Allow-Headers": 'Content-Type',
      "Access-Control-Allow-Origin": '*'
    })
  };

    return this.http.get<IProduct[]>(Routes["allProducts"],httpOptions) */

    //return of(PRODUCTS_MOCK);
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

}
