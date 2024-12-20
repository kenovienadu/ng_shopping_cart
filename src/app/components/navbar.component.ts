import { Component } from '@angular/core';

@Component({
  selector: 'navbar',
  template: `
    <section class="navbar_container">
      <nav class="navbar contained">
        <div class="navbar-logo font-semibold">
          <a href="#" class="text-2xl">Shopi Market</a>
        </div>
        <div>
          <div class="cart_wrapper bg-gray-100">
            <i class="fa-solid fa-cart-shopping"></i>
          </div>
        </div>
      </nav>
    </section>
  `,
  styles: [`
    .navbar_container {
      background-color: #fff;
      padding: 20px 0;
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
      display: inline-grid;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      place-items: center;
    }
  `]
})
export class NavbarComponent {
  // Add any necessary logic here
}
