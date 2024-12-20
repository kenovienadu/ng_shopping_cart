import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'navbar',
  template: `
    <section class="navbar_container">
      <nav class="navbar contained">
        <div class="navbar-logo font-semibold">
          <a href="#" class="text-2xl">Dextro Market</a>
        </div>
        <div>
          <button class="cart_wrapper bg-gray-100 px-3 rounded">
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
      padding: 10px 0;
    }

    .navbar a {
      text-decoration: none;
      font-size: 2rem;
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
    private cartService: CartService
  ) {}
}
