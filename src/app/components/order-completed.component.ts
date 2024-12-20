import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  imports: [CommonModule],
  selector: 'order-completed-modal',
  template: `
    <div class="modal">
      <div class="modal-content">
        <div class="text-[100px] text-green-500 mb-3">
          <i class="fa-solid fa-circle-check"></i>
        </div>
        <h2 class="text-3xl font-semibold mb-3" >Order Completed</h2>
        <p class="mb-6">Your order has been successfully placed! Kindly check your email for a receipt and tracking instructions.</p>
        <button class="w-full h-12 bg-gray-900 text-white rounded" (click)="closeModal()">OK</button>
      </div>
    </div>
  `,
  styles: [`
    .modal {
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
    }

    .modal-content {
      background-color: white;
      padding: 40px;
      border-radius: 25px;
      width: 500px;
      max-width: 100%;
      text-align: center;
    }
  `]
})
export class OrderCompletedModalComponent {
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
