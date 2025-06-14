import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = environment.apiUrl + '/cart';
  private checkoutApiUrl = environment.apiUrl + '/checkout';
  constructor(private http: HttpClient) {}
  getCartItems(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
  addToCart(product: Product): Observable<string> {
    return this.http.post<string>(this.apiUrl, product);
  }
  clearCart(): Observable<void> {
    return this.http.delete<void>(this.apiUrl);
  }
  checkout(): Observable<void> {
    return this.http.get<void>(this.checkoutApiUrl);
  }
  netPrice(products: Product[]): number {
    const net = products.reduce((sum, product) => sum + product.price, 0);
    return net;
  }
}
