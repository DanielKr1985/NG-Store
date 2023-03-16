import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Routes } from 'src/app/core/http/API';
import { IProduct } from '../../shared/models';
import { PRODUCTS_MOCK } from './products.mock';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public getProducts$(): Observable<IProduct[]>{

    const httpOptions = {
    headers: new HttpHeaders({
      "Content-Type":'application/json',
      accept: "application/json",
      "Access-Control-Allow-Headers": 'Content-Type',
      "Access-Control-Allow-Origin": '*'
    })
  };

    return this.http.get<IProduct[]>(Routes["allProducts"],httpOptions)
  }


}
