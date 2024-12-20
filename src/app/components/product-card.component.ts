import { Component, Input } from "@angular/core";
import { ProductItem } from "../../types";
import { CommonModule } from "@angular/common";

@Component({
  imports: [CommonModule],
  selector: 'product-card',
  template: `
    <div *ngIf="product" class="product_card bg-white shadow-md rounded-md p-4">
      <div class="product_image">
        <img [src]="product.imageUrl" alt="Product Image" loading="lazy" />
      </div>
      <div class="px-4 py-2">
        <h3 class="text-lg font-semibold">{{product.name}}</h3>
        <p class="text-sm text-gray-500 mt-1">{{product.description}}</p>

        <div class="mt-3 flex justify-between items-center">
          <p class="text-lg font-semibold">{{ product.price | currency }}</p>
          <button class="bg-gray-800 text-white p-2 rounded text-xs">Add to Cart</button>
        </div>
      </div>
    </div>
  `,
  styles: [``]
})
export class ProductCardComponent {
  // Add any necessary logic here
  @Input() product: ProductItem | undefined
}
