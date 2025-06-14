import { Component, inject, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductServiceService } from '../product-service.service';
import { CartService } from 'src/app/cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectChange } from '@angular/material/select';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  porducts: Product[] = [];
  filteredPorducts: Product[] = [];
  sortBy: string = 'name';
  sortOrder: string = 'asc';
  productService = inject(ProductServiceService);
  constructor(
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.porducts = data;
      this.filteredPorducts = data;
    });
  }
  addToCart(product: Product) {
    this.cartService.addToCart(product).subscribe((data) => {
      this.snackBar.open('✔️' + data, 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    });
  }
  applyFilter(event: Event): void {
    let searchTerm = (event.target as HTMLInputElement).value;
    searchTerm = searchTerm.toLocaleLowerCase();
    this.filteredPorducts = this.porducts.filter((product) =>
      product.name.toLocaleLowerCase().includes(searchTerm)
    );
  }
  applySort(): void {
    this.filteredPorducts = [...this.porducts];

    if (this.sortBy === 'name') {
      this.filteredPorducts.sort((a, b) =>
        this.sortOrder === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
    } else if (this.sortBy === 'price') {
      this.filteredPorducts.sort((a, b) =>
        this.sortOrder === 'asc' ? a.price - b.price : b.price - a.price
      );
    }
  }
}
