import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Product[] = [];
  searchTerm: string = '';
  sortOption: string = 'name';

  constructor(private apiService: ApiService, private router: Router) {
    this.loadProducts();
  }

  loadProducts(): void {
    this.apiService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  deleteProduct(id: number): void {
    this.apiService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }

  editProduct(product: Product): void {
    this.router.navigate(['/product-form'], { state: { product } });
  }

  createProduct(): void {
    this.router.navigate(['/product-form']);
  }

  filteredAndSortedProducts(): Product[] {
    let filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    if (this.sortOption === 'name') {
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.sortOption === 'price') {
      filteredProducts.sort((a, b) => a.price - b.price);
    }

    return filteredProducts;
  }
}
