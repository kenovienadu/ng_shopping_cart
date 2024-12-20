import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";


@Component({
  imports: [CommonModule],
  selector: 'home-screen',
  template: `
    <section class="contained home_container">
      <div class="info">
        <h1 class="text-2xl font-medium">Welcome to Shopi Market</h1>
        <div class="flex justify-between items-center">
          <p class="uppercase mt-6 opacity-60">Showing {{visibleProducts}} of {{totalProducts}} results</p>
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
    </section>
  `,
  styles: [`
    .home_container {
      padding-top: 30px;
    }
  `]
})
export class HomeScreenComponent {
  totalProducts = 32;
  visibleProducts = 10;
  sortBy = 'name';

  sortingOptions = [
    { label: 'Name', value: 'name' },
    { label: 'Price', value: 'price' },
  ]

  selectSortingOption(option: string) {
    this.sortBy = option;
    // TODO: Add sorting logic here
  }
}
