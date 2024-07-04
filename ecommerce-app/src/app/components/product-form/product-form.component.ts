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
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  productForm: Product = {
    name: '',
    description: '',
    price: 0
  };

  constructor(private apiService: ApiService, private router: Router) {
    const product = history.state.product;
    if (product) {
      this.productForm = { ...product };
    }
  }

  createProduct(): void {
    this.apiService.createProduct(this.productForm).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }

  updateProduct(): void {
    if (this.productForm.id) {
      this.apiService.updateProduct(this.productForm.id, this.productForm).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
  }

  resetForm(): void {
    this.productForm = {
      name: '',
      description: '',
      price: 0
    };
  }
}
