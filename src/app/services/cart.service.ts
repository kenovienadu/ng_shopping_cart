import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductItem } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private storageKey = 'cart';
  private cartItems: ProductItem[] = [];
  private cartItemsSubject = new BehaviorSubject<ProductItem[]>(this.cartItems);
  public cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {
    const cartItems = sessionStorage.getItem(this.storageKey);
    if (cartItems) {
      this.cartItems = JSON.parse(cartItems);
      this.cartItemsSubject.next(this.cartItems);
    }
  }

  addToCart(product: ProductItem) {
    this.cartItems.push(product);
    this.cartItemsSubject.next(this.cartItems);
    sessionStorage.setItem(this.storageKey, JSON.stringify(this.cartItems));
  }

  removeFromCart(productId: string) {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.cartItemsSubject.next(this.cartItems);
    sessionStorage.setItem(this.storageKey, JSON.stringify(this.cartItems));
  }

  clearCart() {
    this.cartItems = [];
    this.cartItemsSubject.next(this.cartItems);
    sessionStorage.removeItem(this.storageKey);
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
