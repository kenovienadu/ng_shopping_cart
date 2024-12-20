import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  imports: [CommonModule],
  selector: 'navbar',
  template: `
    <section class="navbar_container">
      <nav class="navbar px-2 md:px-0 py-3 contained">
        <div class="navbar-logo font-semibold">
          <a href="#" class="text-2xl md:text-4xl">Dextro Market</a>
        </div>

        <div class="hidden md:flex text-2xl gap-8">
          <a href="https://facebook.com" target="_blank"><i class="fa-brands fa-facebook"></i></a>
          <a href="https://twitter.com" target="_blank"><i class="fa-brands fa-twitter"></i></a>
          <a href="https://instagram.com" target="_blank"><i class="fa-brands fa-instagram"></i></a>
          <a href="https://pinterest.com" target="_blank"><i class="fa-brands fa-pinterest"></i></a>
          <a href="https://snapchat.com" target="_blank"><i class="fa-brands fa-snapchat"></i></a>
        </div>

        <div>
          <button (click)="openCartPage()" class="cart_wrapper bg-gray-100 px-3 rounded">
            <i class="fa-solid fa-cart-shopping"></i>
            {{ cartTotal | currency }}
          </button>
        </div>
      </nav>
    </section>
  `,
  styles: [`
    .navbar_container {
      background-color: #fff;
      padding: 20px 0;
      position: sticky;
      top: 0;
    }

    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .navbar a {
      text-decoration: none;
    }

    .cart_wrapper {
      display: inline-flex;
      gap: 10px;
      justify-content: center;
      align-items: center;
      height: 50px;
      place-items: center;
    }
  `]
})
export class NavbarComponent {
  get cartTotal() {
    return this.cartService.getTotalPrice();
  }

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  openCartPage() {
    this.router.navigate(['/cart']);
  }
}
