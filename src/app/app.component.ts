import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Product {
  id: number;
  name: string;
  price: number;
  inStock: number;
}

let imageurl ="D:/ITProject/Shop/shop/assets/shiba1.jpg";


interface CartItem extends Product {
  quantity: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Quán ăn ngẫu nhiên';


  products: Product[] = [
    { id: 1, name: 'Shiba màu cam', price: 10000, inStock: 10 },
    { id: 2, name: 'Shiba màu trắng', price: 20000, inStock: 5 },
    { id: 3, name: 'Shiba màu đen', price: 15000, inStock: 7 },
    { id: 4, name: 'Shiba màu xám', price: 8000, inStock: 15 }
  ];

  cart: CartItem[] = [];
  total: number = 0;

  addToCart(index: number) {
    const product = this.products[index];
    if (product.inStock > 0) {
      const cartItem = this.cart.find(item => item.id === product.id);
      if (cartItem) {
        cartItem.quantity++;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
      product.inStock--;
      this.calculateTotal();
    }
  }

  removeFromCart(index: number) {
    const cartItem = this.cart[index];
    const product = this.products.find(p => p.id === cartItem.id);
    if (product) {
      product.inStock += cartItem.quantity;
    }
    this.cart.splice(index, 1);
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  checkout() {
    if (this.cart.length > 0) {
      alert("Thanh toán thành công: " + this.total + "VND");
      this.cart = [];
      this.total = 0;
    } 
      else {
      alert("Giỏ hàng trống");
    }
  }


}