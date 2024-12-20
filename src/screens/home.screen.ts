import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ProductItem } from "../types";
import { products } from "../data";
import { ProductCardComponent } from "../components/product-card.component";
import { FormsModule } from "@angular/forms";
import { SignupModalComponent } from "../components/signup.component";


@Component({
  imports: [CommonModule, ProductCardComponent, FormsModule, SignupModalComponent],
  selector: 'home-screen',
  template: `
    <section class="contained home_container pb-[100px]">
      <div class="info">
        <h1 class="text-2xl font-medium">Welcome to Shopi Market</h1>
        <div class="flex justify-between items-center mt-6">
          <div>
            <!-- Search Input -->
            <input [(ngModel)]="searchQuery" class="w-[500px] h-[48px] px-2 border outline-none" placeholder="Type to Search Products" />
            <p *ngIf="searchQuery && filteredProducts.length" class="uppercase mt-2 opacity-60">
              Showing {{filteredProducts.length}} of {{availableProducts.length}} results
            </p>
          </div>

          <!-- Sorting Options -->
          <div class="inline-flex">
            <button
              (click)="selectSortingOption(option.value)"
              *ngFor="let option of sortingOptions"
              class="p-2 bg-gray-100 capitalize"
              [class.bg-gray-800]="option.value === sortBy"
              [class.text-white]="option.value === sortBy"
            >
              Sort By {{option.label}}
            </button>
          </div>
        </div>
      </div>

      <!-- Product Cards -->
      <div *ngIf="filteredProducts.length; else empty_state" class="grid grid-cols-4 gap-6 mt-12" >
        <product-card *ngFor="let product of filteredProducts" [product]="product"></product-card>
      </div>

      <!-- Empty State -->
      <ng-template #empty_state >
        <p class="text-lg font-semibold text-center mt-12">No products found</p>
      </ng-template>
    </section>

    <signup-modal *ngIf="showSignupModal" ></signup-modal>
  `,
  styles: [`
    .home_container {
      padding-top: 30px;
    }
  `]
})
export class HomeScreenComponent implements OnInit {
  availableProducts: ProductItem[] = [];
  sortBy = 'name';
  searchQuery = '';
  showSignupModal = false;

  sortingOptions = [
    { label: 'Name', value: 'name' },
    { label: 'Price', value: 'price' },
  ]

  get filteredProducts() {
    if (!this.searchQuery) {
      return this.availableProducts;
    }

    return this.availableProducts.filter(product => product.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }

  ngOnInit(): void {
    const defaultImageUrl = "https://res.cloudinary.com/dk07kf3yl/image/upload/v1733673243/temp/item-placeholder_pr2sx5.webp";
    this.availableProducts = products.map(product => ({...product, imageUrl: defaultImageUrl}));
    this.sortProducts();
  }

  sortProducts() {
    if (this.sortBy === 'name') {
      this.availableProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.sortBy === 'price') {
      this.availableProducts.sort((a, b) => a.price - b.price);
    }
  }

  selectSortingOption(option: string) {
    this.sortBy = option;
    this.sortProducts();
  }
}
