import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

interface CartItem {
  productId: number;
  name: string;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cart: CartItem[] = [];
  products: any[] = [];
  searchTerm: string = '';
  sortOption: string = 'name';
  showModal: boolean = false;

  constructor(private apiService: ApiService) {
    this.loadProducts();
    this.loadCart();
  }

  loadProducts(): void {
    this.apiService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  loadCart(): void {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
    }
  }

  saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  addToCart(product: any): void {
    const existingItem = this.cart.find(item => item.productId === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({
        productId: product.id,
        name: product.name,
        quantity: 1,
        price: product.price
      });
    }
    this.saveCart();
  }

  removeFromCart(productId: number): void {
    this.cart = this.cart.filter(item => item.productId !== productId);
    this.saveCart();
  }

  updateQuantity(productId: number, quantity: number): void {
    const item = this.cart.find(item => item.productId === productId);
    if (item && quantity > 0) {
      item.quantity = quantity;
      this.saveCart();
    }
  }

  getTotal(): number {
    return this.cart.reduce((total, item) => total + item.quantity * item.price, 0);
  }

  checkout(): void {
    if (this.cart.length === 0) {
      this.showModal = true;
      return;
    }

    const orderData = {
      userId: 1,  // Replace with the actual user ID from your authentication system
      products: this.cart.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      }))
    };

    this.apiService.createOrder(orderData).subscribe(
      () => {
        //alert('Order placed successfully!');
        this.showModal = true;
        this.cart = [];
        this.saveCart();
      },
      error => {
        alert('An error occurred while placing the order.');
        console.error(error);
      }
    );
  }

  closeModal(): void {
    this.showModal = false;
  }

  filteredAndSortedProducts(): any[] {
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
