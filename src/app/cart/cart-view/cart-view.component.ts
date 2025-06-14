import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css'],
})
export class CartViewComponent implements OnInit {
  constructor(private cartService: CartService) {}
  products: Product[] = [];
  netPrice: number = 0;
  ngOnInit(): void {
    this.cartService.getCartItems().subscribe((data) => {
      this.products = data;
      this.netPrice = this.cartService.netPrice(this.products);
    });
  }
  clearCart(): void {
    this.cartService.clearCart().subscribe(() => {
      this.products = [];
      this.netPrice = 0;
    });
  }

  checkout(): void {
    this.cartService.checkout().subscribe((data) => {
      alert(data);
    });
  }
}
