import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductItem } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: ProductItem[] = [];
  private cartItemsSubject = new BehaviorSubject<ProductItem[]>(this.cartItems);

  cartItems$ = this.cartItemsSubject.asObservable();

  addToCart(product: ProductItem) {
    this.cartItems.push(product);
    this.cartItemsSubject.next(this.cartItems);
  }

  removeFromCart(productId: string) {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.cartItemsSubject.next(this.cartItems);
  }

  clearCart() {
    this.cartItems = [];
    this.cartItemsSubject.next(this.cartItems);
  }

  getCartItems(): ProductItem[] {
    return this.cartItems;
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }

  isInCart(productId: string): boolean {
    return this.cartItems.some(item => item.id === productId);
  }
}
