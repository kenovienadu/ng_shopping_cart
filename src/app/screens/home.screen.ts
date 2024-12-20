import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ProductItem } from "../../types";
import { products } from "../../data";
import { ProductCardComponent } from "../components/product-card.component";
import { FormsModule } from "@angular/forms";
import { SignupModalComponent } from "../components/signup.component";
import { UserService } from "../services/user.service";
import { CartService } from "../services/cart.service";


@Component({
  imports: [CommonModule, ProductCardComponent, FormsModule, SignupModalComponent],
  selector: 'home-screen',
  template: `
    <section class="contained px-2 md:px-0 py-[30px] md:py-[100px]">
      <div class="info">
        <h1 class="text-2xl font-medium capitalize">
          {{welcomeText}}
        </h1>
        <div class="md:flex justify-between items-center mt-6">
          <div>
            <!-- Search Input -->
            <input [(ngModel)]="searchQuery" class="w-full md:w-[500px] h-[48px] px-2 border outline-none" placeholder="Type to Search Products" />
            <p *ngIf="searchQuery && filteredProducts.length" class="uppercase mt-2 opacity-60">
              Showing {{filteredProducts.length}} of {{availableProducts.length}} results
            </p>
          </div>

          <!-- Sorting Options -->
          <div class="grid grid-cols-2 mt-4 md:mt-0 md:inline-flex">
            <button
              (click)="selectSortingOption(option.value)"
              *ngFor="let option of sortingOptions"
              class="p-3 bg-gray-100 capitalize text-xs"
              [class.bg-gray-800]="option.value === sortBy"
              [class.text-white]="option.value === sortBy"
            >
              Sort By {{option.label}}
            </button>
          </div>
        </div>
      </div>

      <!-- Product Cards -->
      <div *ngIf="filteredProducts.length; else empty_state" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-12" >
        <product-card
          *ngFor="let product of filteredProducts"
          [product]="product"
          (cartAction)="handleProductCartAction(product)"
        ></product-card>
      </div>

      <!-- Empty State -->
      <ng-template #empty_state >
        <p class="text-lg font-semibold text-center mt-12">No products found</p>
      </ng-template>
    </section>

    <signup-modal *ngIf="showSignupModal" (close)="showSignupModal = false" ></signup-modal>
  `,
})
export class HomeScreenComponent implements OnInit {
  constructor(
    private userService: UserService,
    private cartService: CartService
  ){}

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

  get welcomeText() {
    if (this.userService.getCurrentUser()) {
      return `Welcome, ${this.userService.getCurrentUser()?.fullName}`
    }

    return `Welcome to Dextro Market`;
  }

  ngOnInit(): void {
    const defaultImageUrl = "https://res.cloudinary.com/dk07kf3yl/image/upload/v1733673243/temp/item-placeholder_pr2sx5.webp";
    // this.availableProducts = products.map(product => ({...product, imageUrl: defaultImageUrl}));
    this.availableProducts = [...products];
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

  handleProductCartAction(product: ProductItem) {
    if (!this.userService.getCurrentUser()) {
      this.showSignupModal = true;
      return;
    }

    if (this.cartService.isInCart(product.id)) {
      this.cartService.removeFromCart(product.id);
      return;
    }

    this.cartService.addToCart(product);
  }
}
