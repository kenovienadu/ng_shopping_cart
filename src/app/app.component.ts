import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../components/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <navbar></navbar>
    <router-outlet />
  `
})
export class AppComponent {
  title = 'ng_shopping_cart';
}
