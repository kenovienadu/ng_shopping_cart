import { Component } from '@angular/core';

@Component({
  selector: 'navbar',
  template: `
    <section class="navbar_container">
      <nav class="navbar container">
        <div class="navbar-logo roboto-bold">
          <a href="#">Shopi Market</a>
        </div>
        <div>
          <div class="cart_wrapper">
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
      padding: 10px 20px;
    }

    .navbar a {
      text-decoration: none;
      color: #333;
      font-size: 1.5rem;
    }

    .cart_wrapper {
      display: inline-grid;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: lightgray;
      place-items: center;
    }
  `]
})
export class NavbarComponent {
  // Add any necessary logic here
}
