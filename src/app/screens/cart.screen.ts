import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProductItem } from '../../types';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OrderCompletedModalComponent } from '../components/order-completed.component';

@Component({
  imports: [CommonModule, OrderCompletedModalComponent],
  template: `
    <section class="cart-container contained py-[100px]">
      <div class="flex justify-between items-center mb-4 pb-4 border-b">
        <h2 class="text-2xl">Your Cart ({{cartItems.length}})</h2>
        <button class="" (click)="clearCart()" >Clear All</button>
      </div>

      <ng-container *ngIf="cartItems.length > 0; else emptyCart">
        <div *ngFor="let item of cartItems" class="bg-white p-12 rounded mb-3 shadow-md">
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-2">
              <img class="w-[100px] h-[100px] object-cover rounded shadow-sm" [src]="item.imageUrl" alt="Product Image" />
              <span>{{ item.name }}</span>
            </div>

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

    <order-completed-modal *ngIf="showCompletedModal" (close)="openProductsPage()" ></order-completed-modal>
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
  showCompletedModal = false;

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

  clearCart() {
    this.cartService.clearCart();
  }

  openProductsPage() {
    this.router.navigate(['/']);
  }

  handleCheckout() {
    this.cartService.clearCart();
    this.showCompletedModal = true;
  }
}
