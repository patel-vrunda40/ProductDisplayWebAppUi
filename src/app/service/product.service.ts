import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Product } from '../model/product.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  readonly ApiUrl = "http://localhost:5000/api/products";  
  
  getAllProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.ApiUrl);
  }

  getProductById(id: string): Observable<Product> {    
    return this.http.get<Product>(this.ApiUrl+'/'+id);
  }
}
