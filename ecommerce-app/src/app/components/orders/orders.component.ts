import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

interface Order {
  id?: number;
  userId: number;
  products: { productId: number, quantity: number }[];
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  orders: Order[] = [];
  searchTerm: string = '';
  sortOption: string = 'id';

  constructor(private apiService: ApiService, private router: Router) {
    this.loadOrders();
  }

  loadOrders(): void {
    this.apiService.getOrders().subscribe(data => {
      this.orders = data;
    });
  }

  deleteOrder(id: number): void {
    this.apiService.deleteOrder(id).subscribe(() => {
      this.loadOrders();
    });
  }

  editOrder(order: Order): void {
    this.router.navigate(['/order-form'], { state: { order } });
  }

  createOrder(): void {
    this.router.navigate(['/order-form']);
  }

  filteredAndSortedOrders(): Order[] {
    let filteredOrders = this.orders.filter(order =>
      order.id?.toString().includes(this.searchTerm)
    );

    if (this.sortOption === 'id') {
      filteredOrders.sort((a, b) => (a.id ?? 0) - (b.id ?? 0));
    } else if (this.sortOption === 'userId') {
      filteredOrders.sort((a, b) => a.userId - b.userId);
    }

    return filteredOrders;
  }
}
