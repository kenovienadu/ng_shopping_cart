import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ProductItem } from "../../types";
import { CommonModule } from "@angular/common";
import { CartService } from "../services/cart.service";

@Component({
  imports: [CommonModule],
  selector: 'product-card',
  template: `
    <div *ngIf="product" class="product_card bg-white shadow-md rounded-md p-4">
      <div class="product_image">
        <img class="object-cover h-[300px] w-full rounded" [src]="product.imageUrl" alt="Product Image" loading="lazy" />
      </div>
      <div class="px-4 py-4">
        <h3 class="text-lg font-semibold">{{product.name}}</h3>
        <p class="text-sm text-gray-500 mt-1">{{product.description}}</p>

        <div class="mt-3 flex justify-between items-center">
          <p class="text-lg font-semibold">{{ product.price | currency }}</p>
          <button
            (click)="addOrRemoveFromCart()"
            class="p-2 rounded text-xs"
            [ngClass]="isInCart ? 'text-gray-800 bg-gray-100' : 'text-white bg-gray-800 hover:bg-gray-700'"
          >
            {{ isInCart ? 'Remove from Cart' : 'Add to Cart' }}
          </button>
        </div>
      </div>
    </div>
  `,
})
export class ProductCardComponent {
  @Input() product: ProductItem | undefined
  @Output() cartAction = new EventEmitter<string>();

  get isInCart() {
    if (!this.product) return false;
    return this.cartService.isInCart(this.product.id);
  };

  constructor(
    private cartService: CartService
  ) {}

  addOrRemoveFromCart() {
    if (!this.product) return;
    this.cartAction.emit(this.product.id);
  }
}
