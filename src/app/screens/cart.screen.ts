import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProductItem } from '../../types';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  imports: [CommonModule],
  template: `
    <section class="cart-container contained py-[100px]">
      <h2 class="mb-4 text-2xl">Your Cart ({{cartItems.length}})</h2>
      <ng-container *ngIf="cartItems.length > 0; else emptyCart">
        <div *ngFor="let item of cartItems" class="bg-white p-12 rounded mb-3">
          <div class="flex justify-between items-center">
            <span>{{ item.name }}</span>

            <div class="flex items-center">
              <span>{{ item.price | currency }}</span>
              <button (click)="removeFromCart(item.id)" class="remove text-gray-300" >
                <i class="fa-solid fa-circle-xmark"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="mt-4 font-semibold flex justify-between items-center p-12">
          <span>Total: </span>
          <span class="pr-4">{{ total | currency }}</span>
        </div>

        <div class="flex justify-between">
          <button (click)="openProductsPage()" class="bg-gray-300 rounded p-2 mt-4" >
            < Continue Shopping
          </button>
          <button (click)="handleCheckout()" class="bg-gray-800 text-white rounded p-2 mt-4" >
            Proceed to Checkout >
          </button>
        </div>
      </ng-container>

      <ng-template #emptyCart>
        <div class="bg-white p-12 text-center rounded mb-3">
          <p class="text-lg">Your cart is empty</p>

          <div class="text-[100px] text-gray-300 mb-3">
            <i class="fa-solid fa-cart-shopping"></i>
          </div>

          <button (click)="openProductsPage()" class="bg-gray-800 text-white rounded p-2 mt-4 text-xs" >
            Start Shopping
          </button>
        </div>
      </ng-template>

    </section>
  `,
  styles: [`
    button.remove {
      position: relative;
      right: -20px;
    }
  `]
})
export class CartScreenComponent implements OnInit {
  cartItems: ProductItem[] = [];
  total: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.total = this.cartService.getTotalPrice();
    });
  }

  removeFromCart(productId: string) {
    this.cartService.removeFromCart(productId);
  }

  openProductsPage() {
    this.router.navigate(['/']);
  }

  handleCheckout() {
    // Logic to handle checkout
  }
}
