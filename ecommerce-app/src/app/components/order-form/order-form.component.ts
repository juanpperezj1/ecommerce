import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

interface Order {
  id?: number;
  userId: number;
  products: { productId: number, quantity: number }[];
}

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent {
  orderForm: Order = {
    userId: 0,
    products: []
  };

  constructor(private apiService: ApiService, private router: Router) {
    const order = history.state.order;
    if (order) {
      this.orderForm = { ...order };
    }
  }

  createOrder(): void {
    this.apiService.createOrder(this.orderForm).subscribe(() => {
      this.router.navigate(['/orders']);
    });
  }

  updateOrder(): void {
    if (this.orderForm.id) {
      this.apiService.updateOrder(this.orderForm.id, this.orderForm).subscribe(() => {
        this.router.navigate(['/orders']);
      });
    }
  }

  addProduct(): void {
    this.orderForm.products.push({ productId: 0, quantity: 1 });
  }

  removeProduct(index: number): void {
    this.orderForm.products.splice(index, 1);
  }

  resetForm(): void {
    this.orderForm = {
      userId: 0,
      products: []
    };
  }
}
