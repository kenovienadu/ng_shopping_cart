import { Routes } from '@angular/router';
import { HomeScreenComponent } from './screens/home.screen';
import { CartScreenComponent } from './screens/cart.screen';

export const routes: Routes = [
  {
    path: '',
    component: HomeScreenComponent
  },
  {
    path: 'cart',
    component: CartScreenComponent
  }
];
